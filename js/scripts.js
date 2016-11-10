function sayHello() {
   alert("Hello World")
};


function get_date(date){
    if (date instanceof Date){
        // TODO 
    } else {
        var today = new Date();
        var dd;
        if (date == 'Heute'){
            var dd = today.getDate();
        } else if (date == 'Morgen'){
            today.setDate(today.getDate() + 1);
            console.log(today.getDate())
            var dd = today.getDate();
        } else {
            console.log(date)
        }
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        } 

        if(mm<10) {
            mm='0'+mm
        } 

        return dd.toString() + mm.toString() + yyyy.toString().substring(2, 4);
    }
};





function get_text(day, direction, position, used){
    hashtag = '#' + get_date(day) + "_" + direction

    positions_text = "Wir treffen uns " + position + ". "
    if (position == 'mitte'){
        positions_text = "Wir treffen uns in der Mitte. "
    }

    if (used == 'nein') {
        ticket = "Das Ticket könnt ihr weiterbenutzen. "
    } else {
        ticket = "Ich brauch das Ticket weiterhin. "
    }

    result = hashtag + ". " + positions_text + ticket
    return result
};



$(document).ready(function(){
    $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });

    var test;
    $('input').on('change', function() {
        day = $('input[name=day_selection]:checked', '#day').val(); 
        direction = $('input[name=direction_selection]:checked', '#direction').val(); 
        position = $('input[name=position_selection]:checked', '#position').val(); 
        used = $('input[name=used_selection]:checked', '#used').val(); 

        result = get_text(day, direction, position, used);
        $('#results').val(result);
    });

    console.log(get_date())

});