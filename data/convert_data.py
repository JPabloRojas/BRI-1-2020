import json
import ndjson

input_file = 'data.json'
output_file = 'converted_data.json'

new_data = []
with open(input_file) as f:
    data = json.load(f)
    for k in data.keys():
        d = data[k]
        new_data.append({
            'index': { '_id': k }
        })
        new_data.append(d)

with open(output_file, 'w') as f:
    ndjson.dump(new_data, f)