import operator
from functools import reduce
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search, connections
from elasticsearch_dsl.query import MultiMatch, Q, Script, FunctionScore

class ESConnection:
    # De especialización
    spec_fields = [
        "info._embedded.specializations._items.name", "info._embedded.specializations._items.subspecializations._items.name",
        "info._embedded.specializations._items.name", "info._embedded.specializations._items.subspecializations._items.name"
    ]

    def __init__(self, host='localhost:9200'):
        self.client = Elasticsearch(host)
    
    def search_keywords(self, words):
        s = Search(using=self.client)
        or_queries = []
        for w in words:
            m = MultiMatch(query=w, fields=self.spec_fields)
            or_queries.append(m)
        
        q = reduce(operator.or_, or_queries)
        s.query = q

        script = {
            'script': { 
                'source': "_score * sigmoid(2.74, 1, Math.sqrt(doc['info.opinion_stats.positive'].value) - doc['info.opinion_stats.negative'].value) * (doc['info.opinion_stats.positive'].value + 1) / (doc['info.opinion_stats.total'].value + 1)" 
            }
        }
        s.query = FunctionScore(query=q, script_score=script)

        return s.execute()

    def match_all(self):
        s = Search(using=self.client)
        s.query('match_all')

        return s.execute()
