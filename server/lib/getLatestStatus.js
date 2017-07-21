const op = require('object-path');
const es = require('elasticsearch');

const HOST_LIMIT = 100;

const client = new es.Client({
  host: process.env.ES
});

const getLatestRecord = item => op.get(item, ['group_docs', 'hits', 'hits', 0, '_source']);

const getBuckets = item => op.get(item, ['aggregations', 'group', 'buckets']);

module.exports = () => {
  return client.search({
    index: 'ops',
    body: {
      "size": 0,
      "aggs": {
        "group": {
          "terms": {
            "field": "address.keyword",
            "size": HOST_LIMIT
          },
          "aggs": {
            "group_docs": {
              "top_hits": {
                size: 1,
                sort: [
                  {
                    "timestamp": {
                      order: "desc"
                    }
                  }
                ]
              }
            }
          }
        }
      }
    }
  })
    .then(data => {
      return getBuckets(data).map(getLatestRecord);
    })
    .catch(msg => {
      console.error(msg);
    });
};