rm js/256/*.closure.js
rm js/libs/*.closure.js
rm js/*.closure.js

# java -jar closure/compiler.jar --property_renaming_report ./prop_rename.log --compilation_level ADVANCED_OPTIMIZATIONS --js js/libs/underscore.js js/256/game.js --use_types_for_optimization > js/256/bundle.closure.js

#java -jar closure/compiler.jar --js js/libs/lib.js --use_types_for_optimization --output_wrapper "var dash = (function() {%output% return dash; })();" --jscomp_warning=checkTypes > js/libs/lib2.js
# echo "
# var underscore = new dash(); 
# window['underscore'] = underscore;
# window['underscore'].elem = dash.prototype.elem;
# window['underscore'].filter = dash.prototype.filter;
# window['underscore'].map = dash.prototype.map;
# window['underscore'].flip = dash.prototype.flip;
# " >> js/libs/lib2.js

# java -jar closure/compiler.jar --js js/libs/lib2.js --compilation_level ADVANCED_OPTIMIZATIONS > js/lib.closure.js

java -jar closure/compiler.jar --js js/libs/person.js --property_renaming_report ./prop_rename.log --variable_renaming_report ./var_rename.log --use_types_for_optimization --jscomp_warning=checkTypes --debug --compilation_level ADVANCED_OPTIMIZATIONS > js/libs/person.closure.js