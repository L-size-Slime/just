/*
 * ssdDynamicRows jQuery plugin
 * Examples and documentation at: https://github.com/sebastiansulinski/dynamic-rows
 * Copyright (c) 2015 Sebastian Sulinski
 * Version: 1.0.0 (27-FEB-2015)
 * Licensed under the MIT.
 * Requires: jQuery v1.9 or later
 */
;(function($) {

    $.fn.ssdDynamicRows = function(options) {

        "use strict";

        var settings = $.extend({

            eventType           : 'click',

            classContainer      : 'dynamicRows',
            classRow            : 'row',

            classAddButton      : 'dynamicAdd',
            classRemoveButton   : 'dynamicRemove',

            classWarning        : 'warning',

            nameDivider         : '-',
			
			
			end : ""

        }, options);



        var row =           '.' + settings.classRow,
            add =           '.' + settings.classAddButton,
            remove =        '.' + settings.classRemoveButton,
            warning =       '.' + settings.classWarning;


        function preventStop(event) {

            "use strict";

            event.preventDefault();
            event.stopPropagation();

        }


        function dynamicAttributes(instance) {

            "use strict";

            var inputs = instance.find(':input'),
                labels = instance.find('label'),
                
                warnings = instance.find(warning);

            $.each(inputs, function(index, value) {

                var name = $(this).prop('name').split(settings.nameDivider),
				
                    newName = name[0];
					
                var ename = $(this).prop('name').split(settings.end)[1],
			
				    newName = newName;
                
                var oid = $(this).prop('id');
                var oidnum = oid.replace(/[^0-9]/ig,""); 
				var sid = oid.split(oidnum); 	
				var newId = sid[0]+(parseInt(oidnum) + 1);


                var typen = $(this).attr("type");
				
				if(typen=="checkbox"||typen=="radio")
				{
					 $(this).prop('name', newName)
                    .prop('id', newId);
				}else if(typen=="button")
				{
					$(this).prop('name', newName)
                    .prop('id', newId);
				}else{
					 $(this).prop('name', newName)
                    .prop('id', newId)
                    .val('');
				}
               

            });

            $.each(labels, function(index, value) {

                var forAttr = $(this).prop('for').split(settings.nameDivider),
				
                    newForAttr = forAttr[0];
					
			    var eforAttr = $(this).prop('for').split(settings.end)[1];
				    newForAttr = newForAttr;

                $(this).prop('for', newForAttr)
                    .prop('class', newForAttr)
                    .find('.warning').remove();

            });

            $.each(warnings, function(index, value) {

                $(this).remove();

            });

            return instance;

        }

        function dynamicTemplate(instance) {

            "use strict";

            return dynamicAttributes(instance.closest(row).clone());

        }

        function dynamicAdd(instance) {

            "use strict";

            instance.on(settings.eventType, add, function(event) {

                preventStop(event);

                var thisRow = $(this).closest(row),
                    newItem = dynamicTemplate(thisRow);

                instance.find(add)
                    .hide();

                instance.append(newItem);

                instance.find(remove)
                    .show();

            });

        }

        function dynamicRemove(instance) {

            "use strict";

            instance.on(settings.eventType, remove, function(event) {

                preventStop(event);

                var thisRow = $(this).closest(row);

                thisRow.fadeOut(200, function() {

                    $(this).remove();

                    var allItems = instance.children(row);

                    allItems.last(row)
                        .find(add)
                        .show();

                    if (allItems.length < 2) {

                        allItems.last(row)
                            .find(remove)
                            .hide();

                    }

                });

            });

        }

        function setUp(instance) {

            "use strict";

            instance.last(row)
                .find(remove)
                .hide();

        }




        return this.each(function() {

            "use strict";

            setUp($(this));
            dynamicAdd($(this));
            dynamicRemove($(this));

        });




    }

}(jQuery));