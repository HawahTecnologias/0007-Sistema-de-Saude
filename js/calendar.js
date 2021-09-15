$(document).ready(function(t, e, i) {
    function t(t) {
        t.each(function() {
            var t = {
                title: $.trim($(this).text())
            };
            $(this).data("eventObject", t), $(this).draggable({
                zIndex: 1070,
                revert: !0,
                revertDuration: 0
            })
        })
    }
    t($("#external-events div.external-event"));
    var e = new Date,
        i = e.getDate(),
        n = e.getMonth(),
        r = e.getFullYear();
    $("#calendar").fullCalendar({
        header: {
            left: "prev,next today",
            center: "title",
            right: "month,agendaWeek,agendaDay"
        },
        buttonText: {
            today: "today",
            month: "month",
            week: "week",
            day: "day"
        },
        events: [{
            title: "Nome do paciente",
            start: new Date(r, n, 3),
            className: "bg-purple"
        },
        {
            title: "Nome do paciente",
            start:  new Date(r, n, 1),
            className: "bg-aqua"
        }
        
        ],
        locale: 'pt',
        editable: !0,
        selectable: !0,
        droppable: !0,
        eventLimit: true,
        drop: function(t, e) {
            var i = $(this).data("eventObject"),
                n = $.extend({}, i);
            n.start = t, n.allDay = e, n.backgroundColor = $(this).css("background-color"), n.borderColor = $(this).css("border-color"), $("#calendar").fullCalendar("renderEvent", n, !0), $("#drop-remove").is(":checked") && $(this).remove()
        },
        eventClick: function(calEvent, jsEvent, view) {
            var $this = this;
            $("#editEname").val(calEvent.title)
            $("#editStarts").datetimepicker("date", calEvent.start._d)
            $("#editEvent").modal({
                backdrop: 'static'
            });
            $("#editEvent").find('.delete-event').show().end().find('.delete-event').unbind('click').click(function() {
                $("#calendar").fullCalendar('removeEvents', function(ev) {
                    return (ev._id == calEvent._id);
                });
                $("#editEvent").modal('hide');
            });
            $("#editEvent").find('form').on('submit', function() {
                calEvent.title = $("#editEname").val();
                calEvent.start = new Date($("#editStarts").data("datetimepicker").date())
                $("#calendar").fullCalendar('updateEvent', calEvent);
                $("#editEvent").modal('hide');
                return false;
            });
        },

        select: function(start, end, allDay) {
            var $this = this;
            $("#register_appointment").modal({
                backdrop: 'static'
            });
            $("#agd_data").datetimepicker("date", start)
            var form = $("#addEventForm");
            $("#addEvent").find('.delete-event').hide().end().find('.save-event').show().end().find('.save-event').unbind('click').click(function() {
                form.submit();
            });

            $("#addEvent").find('form').on('submit', function() {
                var title = form.find("#eventName").val();
                var start = form.find("#eventStarts").val();
                var end = form.find("input[name='ending']").val();
                var categoryClass = form.find("#addColor [type=radio]:checked").data("color");
                if (title !== null && title.length != 0) {
                    $("#calendar").fullCalendar('renderEvent', {
                        title: title,
                        start: start,
                        end: end,
                        allDay: true,
                        className: categoryClass
                    }, true);
                    $("#addEvent").modal('hide');
                } else {
                    alert('You have to give a title to your event');
                }
                return false;
            });
            $("#calendar").fullCalendar('unselect');

        }
    });
    var a = "#3c8dbc";
    $("#color-chooser-btn");
    $("#color-chooser > li > a").on("click", function(t) {
        t.preventDefault(), a = $(this).css("color"), $("#add-new-event").css({
            "background-color": a,
            "border-color": a
        })
    }), $("#add-new-event").on("click", function(e) {
        e.preventDefault();
        var i = $("#new-event").val();
        if (0 != i.length) {
            var n = $("<div />");
            n.css({
                "background-color": a,
                "border-color": a,
                color: "#fff"
            }).addClass("external-event"), n.html(i), $("#external-events").prepend(n), t(n), $("#new-event").val("")
        }
    });

})