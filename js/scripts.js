function sayHello() {
   alert("Hello World")
};


function get_date(){
        yy = $('.datepicker').pickadate('picker').get('highlight', 'yy'); 
        mm = $('.datepicker').pickadate('picker').get('highlight', 'mm'); 
        dd = $('.datepicker').pickadate('picker').get('highlight', 'dd'); 
        // working hack..
        // $('.datepicker').close();
        //$('.datepicker').deactivate();
        return dd.toString() + mm.toString() + yy.toString();
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
    selectMonths: false, // Creates a dropdown to control month
    selectYears: 0, // Creates a dropdown of 15 years to control year
    onSet: function(context) {
        this.close();
  }
});
    $('.datepicker').pickadate().pickadate('picker').set('select',  new Date());

    $('input').on('change', function() {
        day = get_date();
        direction = $('input[name=direction_selection]:checked', '#direction').val(); 
        position = $('input[name=position_selection]:checked', '#position').val(); 
        used = $('input[name=used_selection]:checked', '#used').val(); 

        result = get_text(day, direction, position, used);
        $('#results').val(result);
    });

});