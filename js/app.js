

let button = document.querySelector('#gen')

function count(array_elements){
    let res = []
    array_elements.sort();

    var current = null;
    var cnt = 0;
    for (var i = 0; i < array_elements.length; i++) {
        if (array_elements[i] != current) {
            if (cnt > 0) {
                res.push({text: current, size: cnt * 10})

            }
            current = array_elements[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        res.push({text: current, size: cnt * 10})
    }
    return res
}



function saveSvg(svgEl, name) {
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var svgData = svgEl.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}


button.addEventListener('click', () => {        
        let str = document.querySelector('#text').value
        str = str.trim()
        str.length == 0 ? $('#myModal').modal('show') : ''
        str = str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ")
        str = str.replace(/\s{2,}/g," ")
        str = str.replace(/\?/g, ' ')
        str = str.toLowerCase()

        arr = str.split(" ")   
        
     
        let test = count(arr)
        console.log(test)
        let skillsToDraw = count(arr)

        let w = document.querySelector('#width').value
        let h = document.querySelector('#height').value
        if(w.length == 0 || h.length == 0){
            $('#myModal').modal('show');
        }
        else{
            var width = document.querySelector('#width').value;
            var height = document.querySelector('#height').value;
            var fill = d3.scale.category20();
            d3.layout.cloud()
            .size([width, height])
            .words(skillsToDraw)
            .rotate(function() {
                return ~~(Math.random() * 2) * 90;
            })
            .font("Impact")
            .fontSize(function(d) {
                return d.size;
            })
            .on("end", drawSkillCloud)
            .start();
    
            function drawSkillCloud(words) {
                document.querySelector('#cloud').innerHTML = ''
                d3.select("#cloud").append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + ~~(width / 2) + "," + ~~(height / 2) + ")")
                    .selectAll("text")
                    .data(words)
                    .enter().append("text")
                    .style("font-size", function(d) {
                        return d.size + "px";
                    })
                    .style("-webkit-touch-callout", "none")
                    .style("-webkit-user-select", "none")
                    .style("-khtml-user-select", "none")
                    .style("-moz-user-select", "none")
                    .style("-ms-user-select", "none")
                    .style("user-select", "none")
                    .style("cursor", "default")
                    .style("font-family", "Impact")
                    .style("fill", function(d, i) {
                        return fill(i);
                    })
                    .attr("text-anchor", "middle")
                    .attr("transform", function(d) {
                        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    .text(function(d) {
                        return d.text;
                    });
            }    
            let svg = document.getElementsByTagName("svg")[0];
            var bbox = svg.getBBox();
            var viewBox = [bbox.x, bbox.y, bbox.width, bbox.height].join(" ");
            svg.setAttribute("viewBox", viewBox);
        }
})

document.querySelector('#save').addEventListener('click', () => {
    let svg = document.getElementsByTagName("svg")[0];
    saveSvg(svg, 'etiketBulutu.svg')
})

