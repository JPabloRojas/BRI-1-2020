from flask import Flask, jsonify, request
from demo import querys
from elastic.elastic import *

app = Flask(__name__)
elastic_class_connection = ESConnection()

@app.route('/query', methods=['POST'])
def sendQuery():
    parse_query = request.json['query'].split(' ')
    response = elastic_class_connection.search_keywords(parse_query)
    return_response = []
    for hit in response:
        return_response.append(hit['info'].to_dict())
    return jsonify(return_response)

if __name__ == '__main__':
    app.run(debug=True)# tambien se puede indicar el port