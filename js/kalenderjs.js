$(document).ready(function() {

	
	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'year,month,agendaQuarter,agendaDay'
				/* Add quarter please */
		},		
		defaultDate: new Date(),
		defaultView: 'year',
		yearColumns: 4,
		selectable: true,
		selectHelper: true,
		select: function(start, end) {
			var title = prompt('Event Title:');
			var eventData;
			if (title) {
				eventData = {
					title: title,
					start: start,
					end: end
				};
				$('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
			}
			$('#calendar').fullCalendar('unselect');
		},
		firstDay: 1,
		editable: true,
		eventLimit: true, // allow "more" link when too many events
		events: [
			{
				start: '2018-01-01',
				end: '2018-01-06',
				rendering: 'background'
			},
			{
				title: 'Long event',
				start: '2018-01-07',
				end: '2018-01-10'
			},
			/*{
				title: 'Background Yearview Dev',
				start: '2018-01-04',
				end: '2018-01-19',
				rendering: 'background'
			},*/
			{
				id: 999,
				title: 'Repeating Event',
				start: '2018-01-09T16:00:00'
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: '2018-01-16T16:00:00'
			},
			{
				title: 'Long over months',
				start: '2018-01-29',
				end: '2018-02-02'
			},
			{
				title: 'All Day Event',
				start: '2018-03-01'
			},
			{
				title: 'Conference',
				start: '2018-11-11',
				end: '2018-11-13'
			},
			{
				title: 'Meeting',
				start: '2018-11-12T10:30:00',
				end: '2018-11-12T12:30:00'
			},
			{
				title: 'Lunch',
				start: '2018-11-12T12:00:00'
			},
			{
				title: 'Meeting',
				start: '2018-11-12T14:30:00'
			},
			{
				title: 'Happy Hour',
				start: '2018-11-12T17:30:00'
			},
			{
				title: 'Dinner',
				start: '2018-11-12T20:00:00'
			},
			{
				title: 'Birthday Party',
				start: '2018-11-13T07:00:00'
			},
			{
				title: 'Click for Google',
				url: 'http://google.com/',
				start: '2018-03-28'
			}
		]
	});
});