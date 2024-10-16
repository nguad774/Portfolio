function init(){
	var el = document.getElementById('canvas');
  
	var myLocation = new google.maps.LatLng(28.418629952608175, -81.5815260222447);
  
	var mapOptions = {
		center: myLocation,
		zoom: 18,
		mapTypeId: google.maps.MapTypeId.SATELLITE,
		mapTypeControlOptions: {
			position: google.maps.ControlPosition.BOTTOM_CENTER
		}
	};
  
	var myMap = new google.maps.Map(el, mapOptions);

  var marker = new google.maps.Marker({
    position: myLocation,
		map: myMap,
    draggable: true,
    title: "Click to zoom",
    icon: 'images/mickey.png'
  });
  marker.addListener("click", toggleBounce);

  function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

	var contentString = '<h1 id="mickey">Magic Kingdom Park</h1><p>Explore Lands of Endless Enchantment, Where Your Fantasy Becomes a Reality</p>';

	var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 200,
      ariaLabel: "Uluru",
  	});
    
	google.maps.event.addListener(marker, 'mouseover', function() {
    	infowindow.open(myMap, marker);
  	});

  myMap.addListener("center_changed", () => {
    window.setTimeout(() => {
      myMap.panTo(marker.getPosition());
    }, 8000);
  });
  
  marker.addListener("click", () => {
    myMap.setZoom(30);
    myMap.setCenter(marker.getPosition());
  });
}

google.maps.event.addDomListener(window, 'load', init);