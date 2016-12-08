var TIME_ENTERED = false;

function get_date() {
    yy = $('.datepicker').pickadate('picker').get('highlight', 'yy');
    mm = $('.datepicker').pickadate('picker').get('highlight', 'mm');
    dd = $('.datepicker').pickadate('picker').get('highlight', 'dd');
    // working hack..
    // $('.datepicker').close();
    //$('.datepicker').deactivate();
    return dd.toString() + mm.toString() + yy.toString();
};

function get_time() {
    time = $('#time').val();
    return time
};

function get_text(day, direction, time, position, used, used_direction) {
    hashtag = '#' + get_date(day) + "_" + direction;
    time = ' ' + time + '. ';
    positions_text = "Wir treffen uns " + position + ". ";
    if (position == 'mitte') {
        positions_text = "Wir treffen uns in der Mitte. "
    };
    if (used == 'nein') {
        ticket = "Das Ticket könnt ihr weiterbenutzen. "
    } else {
        if (used_direction === undefined | used_direction === "") {
            ticket = "Ich brauch das Ticket weiterhin."
        } else {
            ticket = "Ich brauch das Ticket weiter " + used_direction
        }
    }

    result = hashtag + ". " + time + positions_text + ticket
    return result
};

function update_text() {
    day = get_date();
    direction = $('input[name=direction_selection]:checked', '#direction').val();
    if(!TIME_ENTERED){
        dt = new Date($.now());
        dep_sbg = 15;
        dep_muc = 55;
        if(direction == 'muc_sbg'){
            mm = dep_muc;
            hh = update_hour(dep_muc);
        } else {
            mm = dep_sbg;
            hh = update_hour(dep_sbg)
        }
        $('#time').val(hh + ':' + mm);
    }
    time = get_time();
    position = $('input[name=position_selection]:checked', '#position').val();
    used = $('input[name=used_selection]:checked', '#used').val();
    if (used == 'ja') {
        $('.display_used_yes_direction').css('display', 'block');
    } else {
        $('.display_used_yes_direction').css('display', 'none');
    };
    used_direction = $('#used_yes_direction').val();
    result = get_text(day, direction, time, position, used, used_direction);
    $('#results').val(result);
};

function update_hour(threshold) {
    if(dt.getMinutes() > threshold){
        hh = (dt.getHours() + 1) % 24
    } else {
        hh = dt.getHours()
    }
    return hh
}

$(document).ready(function() {

    $('.datepicker').pickadate({
        selectMonths: false, // Creates a dropdown to control month
        selectYears: 0, // Creates a dropdown of 15 years to control year
        onSet: function(context) {
            if (context['select']){
                this.close();
            }
        }
    });
    $('.datepicker').pickadate().pickadate('picker').set('select', new Date());
    update_text();
    $('#time').on('change', function() {
        TIME_ENTERED = true;
    });
    $('input').on('change', function() {
        update_text();
    });

    $('#used_yes_direction').on('keyup', function() {
        update_text();
    });



});