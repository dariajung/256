rm js/*.closure.js

#java -jar closure/compiler.jar --externs js/externs/underscore.js --js js/game.js --compilation_level ADVANCED_OPTIMIZATIONS > js/game.closure.js
#java -jar closure/compiler.jar --externs js/externs/underscore.js --js js/underscore.js --compilation_level ADVANCED_OPTIMIZATIONS > js/underscore.closure.js


# java -jar closure/compiler.jar --externs js/externs.js --js js/underscore.js --compilation_level ADVANCED_OPTIMIZATIONS > js/underscore.closure.js
java -jar closure/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js js/libs/underscore.js js/256/game.js > js/256/bundle.closure.js

# java -jar closure/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js js/lib.js js/test.js > js/lib.closure.js