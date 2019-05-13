wget http://gogs.bbnwork.top/yjqpro/neo_api_server_proto/raw/master/api_server.proto -O api_server.proto
wget http://gogs.bbnwork.top/yjqpro/neo_api_server_proto/raw/master/data_feed_server.proto
pbjs -t json api_server.proto > api_server.json
pbjs -t json data_feed_server.proto > data_feed_server.json
