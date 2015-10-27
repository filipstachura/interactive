var wsURL = "ws://localhost:9454";

var ws = new WebSocket(wsURL);

createNewSegment = function() {
  var note = $(".note").last().clone().appendTo("#notebook");
  $(note).find(".input").removeClass("disabled");
  $(note).find("#reqCode").val("");
  $(note).find(".result-in-here").html("");
  $(note).find("#reqCalc").click(createClickHandler(note));
};

ws.onmessage = function(msg) {
  var json = msg.data;
  var data = JSON.parse(json);
  $(".note").last().find(".result-in-here").html(JSON.stringify(data.value));
  createNewSegment();
};

createClickHandler = function (note) {
  return function (event) {
    $(event.target).parent(".input").addClass("disabled");
    var code = $(note).find("#reqCode").val();
    ws.send(code);
  };
};

$(document).ready(function () {
  $("#reqCalc").click(createClickHandler(".note"));
});