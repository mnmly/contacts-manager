coffee -wc -o javascripts src/coffee/*.coffee & \
./node_modules/stylus/bin/stylus -w src/stylus/*.styl -o stylesheets/ & \
livereload & \
serve
