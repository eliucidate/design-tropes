var str = `<a href="placeholder0" class="images">
    <figure class="cont">
      <div class="card">
      <h2 class="font2"> <span class="font4">T:</span>placeholder2</h2>
      <p class="font1">
        placeholder3
      </p>
      <a href="placeholder0" id="seemore">See More</a>
    </div>
      <figcaption class="font5">
        Added placeholder4 - placeholder5 edits
      </figcaption>
    </figure>

  </a>`
  
$(document).ready(function(){
    getEntry();
});

function getEntry(){
	let tropelist = document.getElementById("images");
	$.get('/get/new', function(res){
		for (i in res){
			let template = str;
			let row = res[i];
			let date = row.created_at.slice(0, 10);
			template = template.replace(/placeholder0/g, row.url);
			template = template.replace("placeholder2", row.name);
			template = template.replace("placeholder3", row.description.slice(0, 200));
			template = template.replace("placeholder4", date)
			template = template.replace("placeholder5", row.edits)
			//console.log(template);
			let a = document.createElement('a');
			a.innerHTML = template;
			tropelist.appendChild(a);
		}
		});
}
