d3.csv('visdata.csv', d3.autoType)
  .then(data => {
        console.log(data);
        generateSC(data);
})

const margin = { top: 20, right: 20, bottom: 20, left: 40 };

const width = 800 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

const svg = d3
    .select(".schart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append('g')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg
  .append("text")
  .attr("class", "yat")
  .attr('x',2)
  .attr('y',5)
  //.text('Billion USD')
  .attr("text-anchor", "start")
  .style('font-size','12px')
  .style('font-weight','bold');

svg
  .append("text")
  .attr("class", "xat")
  .attr('x',width+2)
  .attr('y',height-3)
  //.text('Billion USD')
  .attr("text-anchor", "end")
  .style('font-size','12px')
  .style('font-weight','bold');


function generateSC(data){

  const m = data.map(d => {return d.Date;});
  const y = data.map(d => {return d.SavingsRate/100;});
  
  const xScale = d3.scaleTime()
    .domain(d3.extent(m))
    .range([0,width]);
  
  console.log('look',d3.extent(m))
  
  console.log(data[54].Date,xScale(data[54].Date))
  
  const yScale = d3.scaleLinear()
    .domain([0,.37])
    .range([height,0]);
  
  console.log(yScale(data[52].SavingsRate))
  
  //const tV = data.map(d => {return d.Years;});
  
  //console.log(tV);

  const xAxis = d3.axisBottom().scale(xScale);
  const yAxis = d3.axisLeft().scale(yScale).tickFormat(d3.format(".0%"));
  
  svg
  .append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis)

  svg
  .append("g")
  .attr("class", "y-axis")
  .call(yAxis)
  
  const line = d3
    .line()
    .x(d => xScale(d.Date))
    .y(d => yScale(d.SavingsRate/100));
    
  const path = svg.append('path')
    .datum(data)
    .attr('fill','transparent')
    .attr('stroke','black')
    .attr('stroke-width',3)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr('opacity',.6)
    .attr('d',line);
  
  const pathLength = path.node().getTotalLength();
// D3 provides lots of transition options, have a play around here:
// https://github.com/d3/d3-transition
const transitionPath = d3
  .transition()
  .ease(d3.easeSin)
  .duration(2500);

path
  .attr("stroke-dashoffset", pathLength)
  .attr("stroke-dasharray", pathLength)
  .transition(transitionPath)
  .attr("stroke-dashoffset", 0);
  
//svg
//    .selectAll('circle')
//   .data(data)
//    .enter()
//    .append("circle")
//    .attr("cx", d => xScale(d.Date))
//    .attr("cy", d => yScale(d.SavingsRate/100))
//    .attr("r", 3.5)
//    .attr("fill", 'white')
//    .attr("stroke", "#3B3B3B")
  
  svg
    .selectAll("label")
    .data(data)
    .enter()
    .append("text")
    .attr("x", d => xScale(d.Date))
    .attr("y", d => yScale(d.SavingsRate))
    //.attr("text-anchor", "middle")
    .attr("font-size", "11px")
    //.text(d => {return d.Date;})
    .each(position)
    .call(halo);
  
  svg.select('.y-axis').select(".domain").remove();
  svg.select('.x-axis').select(".domain").remove();
  
  svg.selectAll('.y-axis .tick line')
    .clone()
    .attr("x2", width)
    .attr("stroke-opacity", 0.1);
  
  svg.selectAll('.x-axis .tick line')
    .clone()
    .attr("y1", -height)
    .attr('y2',0)
    .attr("stroke-opacity", 0.1);
  
  svg.select('.yat')
    .text('Savings Rate');
  
  svg.select('.xat')
    .text('Year');
    
}