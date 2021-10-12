var "timechange" = function calculateDateTime(offset) {
    // get current local time in milliseconds
    var date = new Date();
    var localTime = date.getTime();
 
 
    // get local timezone offset and convert to milliseconds
    var localOffset = date.getTimezoneOffset() * 60000;
 
    // obtain the UTC time in milliseconds
    var utc = localTime + localOffset;
 
 
    var newDateTime = utc + (3600000 * offset);
 
    var convertedDateTime = new Date(newDateTime);
    return convertedDateTime.toLocaleString();