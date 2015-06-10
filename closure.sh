rm js/256/*.closure.js
rm js/libs/*.closure.js
rm js/*.closure.js

# java -jar closure/compiler.jar --externs js/externs.js --js js/underscore.js --compilation_level ADVANCED_OPTIMIZATIONS > js/underscore.closure.js
# java -jar closure/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js js/libs/underscore.js js/256/game.js > js/256/bundle.closure.js

java -jar closure/compiler.jar --js js/libs/lib.js --jscomp_warning=checkTypes > js/lib.closure.js