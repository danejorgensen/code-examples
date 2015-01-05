// JQuery 2.1.X/AJAX
// Example of pulling property listings from an external api

$(function() {
  $("#property-id").val("1");

  function setProperty(hash) {
    $("#property").html(
      "<h2>" + hash.name + "</h2>" +
      "<p>" + 
        "<strong>Amount:</strong> " +
        "<span>$" + hash.amount + "</span>" +
        "<br />" +
        "<strong>Bedrooms:</strong> " +
        "<span>" + hash.bedrooms + "</span>" +
        "<br />" +
        "<strong>Bathrooms:</strong> " +
        "<span>" + hash.bathrooms + "</span>" +
      "</p>"
    );
  }

  function getProperty() {
    $("#property").html("");
    $("#loading").show();

    var propertyId = $("#property-id").val();

    $.ajax({
      url: "http://realestate.example.org/api/v1/properties/" + propertyId + ".json",
      type: "GET",
      dataType: "json",
      contentType: "application/json; charset=utf-8"
    })
    .done(function(data) {
      if(data.property) {
        setProperty({
          name: data.property.name,
          amount: data.property.amount,
          bedrooms: data.property.bedrooms,
          bathrooms: data.property.bathrooms
        });
      } else {
        $("#error").html("Did not receive property data!").show();
      }
    })
    .fail(function(data) {
      $("#error").html("Failed to receive data.  Please try again.").show();
      setProperty({
        name: "Default Property",
        amount: "1,000,000",
        bedrooms: "7",
        bathrooms: "6"
      });
    })
    .always(function() {
      $("#loading").hide();
      setTimeout(function() {
        $("#success").fadeOut("fast");
        $("#error").fadeOut("fast");
      }, 3000);
    });
  }

  getProperty();

  $("#get-property").click(function() {
    getProperty();
  });
});
