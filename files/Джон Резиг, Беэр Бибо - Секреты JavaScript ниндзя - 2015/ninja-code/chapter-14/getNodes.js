function getNodes(htmlString,doc,fragment) {

  var map = {                                                     //#1
    "<td":[3, "<table><tbody><tr>", "</tr></tbody></table>"],
    "<th":[3, "<table><tbody><tr>", "</tr></tbody></table>"],
    "<tr":[2, "<table><thead>", "</thead></table>"],
    "<option":[1, "<select multiple='multiple'>", "</select>"],
    "<optgroup":[1, "<select multiple='multiple'>", "</select>"],
    "<legend":[1, "<fieldset>", "</fieldset>"],
    "<thead":[1, "<table>", "</table>"],
    "<tbody":[1, "<table>", "</table>"],
    "<tfoot":[1, "<table>", "</table>"],
    "<colgroup":[1, "<table>", "</table>"],
    "<caption":[1, "<table>", "</table>"],
    "<col":[2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
    "<link":[3, "<div></div><div>", "</div>"]
  };

  var tagName = htmlString.match(/<\w+/), //#2
      mapEntry = tagName ? map[tagName[0]] : null;               //#3
  if (!mapEntry) mapEntry = [0, "", ""];                         //#3

  var div = (doc || document).createElement("div");               //#4

  div.innerHTML = mapEntry[1] + htmlString + mapEntry[2];         //#5

  while (mapEntry[0]--) div = div.lastChild;                      //#6

  return div.childNodes;                                          //#7
}
