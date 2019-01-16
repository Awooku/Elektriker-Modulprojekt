$(document).ready(function() {

	
	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'year,month,agendaQuarter,agendaWeek'
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
				title: 'Meeting',
				start: '2019-02-13T11:00:00',
				constraint: 'availableForMeeting', // defined below
				color: '#257e4a'
			},
			// areas where "Meeting" must be dropped
			{
				id: 'availableForMeeting',
				start: '2019-02-11T10:00:00',
				end: '2015-02-11T16:00:00',
				rendering: 'background'
			},
			{
				id: 'availableForMeeting',
				start: '2019-02-13T10:00:00',
				end: '2015-02-13T16:00:00',
				rendering: 'background'
			},
			// red areas where no events can be dropped
			{
				start: '2019-02-24',
				end: '2015-02-28',
				overlap: false,
				rendering: 'background',
				color: '#ff9f89'
			},
			{
				start: '2019-02-06',
				end: '2015-02-08',
				overlap: false,
				rendering: 'background',
				color: '#ff9f89'
			}
		]
	});
});