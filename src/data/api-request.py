import requests
import json
import os

file_out = 'data.json'

num_events = 15 # total number of events used by the game

api_key = os.getenv('API_NINJAS_KEY')

# format_data(): Format the API response to simpler structure

# Structure of data_out:
# [
#     "years": [1, 2, 3]
#     "events": ["", "", ""]
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
    year = 1984 # starting year (will be randomly generated in the future)
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
                num_returned_events += len(result_json)
            else:
                print("Error:", response.status_code, response.text)

        # trim down our list to only have num_events members
        trimmed_json = result_json[:num_events]
        # print(f"Num entries: {len(result_json)}")
        # print(f"Num entries: {len(trimmed_json)}")

        formatted_json = format_data(trimmed_json)

        # save the result into a JSON file
        with open(file_out, 'w') as json_file:
            json.dump(formatted_json, json_file, indent=2)

        print("Result saved to data.json")
    else:
        print("Error:", response.status_code, response.text)



main()