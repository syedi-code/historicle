import requests
import json
import os
import random

num_events = 30 # total number of events used by the game
                # this should be "(maxGuesses + 1) * 3"

file_out = 'data.json'
api_key = os.getenv('API_NINJAS_KEY')

# clean_data(): Attempts to remove duplicate events from the JSON reponse
# Does so by checking if the first 8 characters in an event matches the first 8 of any other, then removes it
# This is a crappy workaround but it's better than nothing, maybe I will update it in the future :)
def clean_data(data_in):
    unique_descriptions = set()

    unique_events = []
    for event in data_in:
        description_prefix = event['event'][:8]

        if description_prefix not in unique_descriptions:
            unique_descriptions.add(description_prefix)
            unique_events.append(event)
    
    return unique_events

# format_data(): Format the API response to simpler structure
# Structure of data_out:
# [
#     "years": [1, 2, 3, ..., 99]
#     "minYear": 0
#     "maxYear": 2024
#     "events": ["", "", "", ...]
# ]
def format_data(data_in):
    # init empty lists
    years = []
    events = []

    # extract data from JSON response and transform it into correct structure
    for entry in data_in:
        year = int(entry.get("year", 0))
        event = entry.get("event", "")

        years.append(year)
        events.append(event)

    # remove duplicate years from years array
    unique_years = set(years)
    years = list(unique_years)

    # format data as dict and return
    data_out = {
        "years": years,
        "minYear": min(years),
        "maxYear": max(years),
        "events": events
    }
    return data_out

def main():
    #year = random.randint(0, 2024) # starting year
    year = 404
    api_url = 'https://api.api-ninjas.com/v1/historicalevents?year={}'.format(year)
    response = requests.get(api_url, headers={'X-Api-Key': api_key})

    if response.status_code == requests.codes.ok:
        # parse the JSON response
        result_json = response.json()
        num_returned_events = len(result_json)

        # get more events while we don't have enough (returned events < num_events)
        while (num_returned_events < num_events):
            year += 1
            api_url = 'https://api.api-ninjas.com/v1/historicalevents?year={}'.format(year)
            response = requests.get(api_url, headers={'X-Api-Key': api_key})

            if response.status_code == requests.codes.ok:
                result_json.extend(response.json())
                result_json = clean_data(result_json)
                num_returned_events = len(result_json)

            else:
                print("Error:", response.status_code, response.text)

        # trim down our list to only have n = num_events members        
        trimmed_json = result_json[:num_events]

        formatted_json = format_data(trimmed_json)

        # save the result into a JSON file
        with open(file_out, 'w') as json_file:
            json.dump(formatted_json, json_file, indent=2)

        print("Result saved to data.json")
    else:
        print("Error:", response.status_code, response.text)



main()