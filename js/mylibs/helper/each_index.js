// {{#each_with_index records}}
//  <li class="legend_item{{index}}"><span></span>{{Name}}</li>
// {{/each_with_index}}

Handlebars.registerHelper("each_with_index", function(array, fn) {
  var total = array.length;
  var buffer = "";
  for (var i = 0, j = array.length; i < j; i++) {
    var item = array[i];

    // stick an index property onto the item, starting with 1, may make configurable later
    item.index = i+1;
    item.total = total;
    item.percent = item.index/item.total*100;
    // show the inside of the block
    buffer += fn(item);
  }

  // return the finished buffer
  return buffer;

});