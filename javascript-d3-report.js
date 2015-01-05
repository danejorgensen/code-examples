// Javascript/D3
// Demonstrates building a Funnel Report with D3 (Visitors > Leads > Orders)

var margin = {top: 10, right: 0, bottom: 10, left: 0},
    width = 120 - margin.left - margin.right,
    height = 70 - margin.top - margin.bottom;

//var width = 120;
//var height = 50;
var barWidth = 4;
var dateFormat = d3.time.format('%m/%d/%Y');
var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
var xAxis = d3.svg.axis().scale(x).orient('bottom').tickSize(0);

// CANCELLATIONS
var cancellations = d3.select(".cancellations")
                      .attr("width", width + margin.left + margin.right)
                      .attr("height", height + margin.top + margin.bottom)
                      .append("g")
                      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var cancellation_y = d3.scale.linear().range([height, 0]);

d3.csv('data/cancellations.csv', function (data) {
  data.forEach(function (d) {
    d.dd = dateFormat.parse(d.date);
    d.total = +d.total; // coerce to number
  });

  cancellation_y.domain([0, d3.max(data, function(d) { return d.total; })]);

  var bar = cancellations.selectAll("g")
              .data(data)
              .enter()
              .append("g")
              .attr("transform", function(d, i) {
                return "translate(" + i * barWidth + ",0)";
              });

  bar.append("rect")
    .attr("y", function(d) { return cancellation_y(d.total); })
    .attr("height", function(d) { return height - cancellation_y(d.total); })
    .attr("width", barWidth - 1);

  cancellations.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
});

// VISITORS
var visitors = d3.select(".visitors")
                 .attr("width", width + margin.left + margin.right)
                 .attr("height", height + margin.top + margin.bottom)
                 .append("g")
                 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var visitor_y = d3.scale.linear().range([height, 0]);

d3.csv('data/visitors.csv', function (data) {
  data.forEach(function (d) {
    d.dd = dateFormat.parse(d.date);
    d.total = +d.total; // coerce to number
  });

  visitor_y.domain([0, d3.max(data, function(d) { return d.total; })]);

  var bar = visitors.selectAll("g")
              .data(data)
              .enter()
              .append("g")
              .attr("transform", function(d, i) {
                return "translate(" + i * barWidth + ",0)";
              });

  bar.append("rect")
    .attr("y", function(d) { return visitor_y(d.total); })
    .attr("height", function(d) { return height - visitor_y(d.total); })
    .attr("width", barWidth - 1);

  visitors.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
});

// LEADS
var leads = d3.select(".leads")
                 .attr("width", width + margin.left + margin.right)
                 .attr("height", height + margin.top + margin.bottom)
                 .append("g")
                 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var lead_y = d3.scale.linear().range([height, 0]);

d3.csv('data/leads.csv', function (data) {
  data.forEach(function (d) {
    d.dd = dateFormat.parse(d.date);
    d.total = +d.total; // coerce to number
  });

  lead_y.domain([0, d3.max(data, function(d) { return d.total; })]);

  var bar = leads.selectAll("g")
              .data(data)
              .enter()
              .append("g")
              .attr("transform", function(d, i) {
                return "translate(" + i * barWidth + ",0)";
              });

  bar.append("rect")
    .attr("y", function(d) { return lead_y(d.total); })
    .attr("height", function(d) { return height - lead_y(d.total); })
    .attr("width", barWidth - 1);

  leads.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
});


// ORDERS
var orders = d3.select(".orders")
               .attr("width", width + margin.left + margin.right)
               .attr("height", height + margin.top + margin.bottom)
               .append("g")
               .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var order_y = d3.scale.linear().range([height, 0]);

d3.csv('data/orders.csv', function (data) {
  data.forEach(function (d) {
    d.dd = dateFormat.parse(d.date);
    d.total = +d.total; // coerce to number
  });

  order_y.domain([0, d3.max(data, function(d) { return d.total; })]);

  var bar = orders.selectAll("g")
              .data(data)
              .enter()
              .append("g")
              .attr("transform", function(d, i) {
                return "translate(" + i * barWidth + ",0)";
              });

  bar.append("rect")
    .attr("y", function(d) { return order_y(d.total); })
    .attr("height", function(d) { return height - order_y(d.total); })
    .attr("width", barWidth - 1);

  orders.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
});
