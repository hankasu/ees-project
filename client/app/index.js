// Code goes here
$('document').ready(init);

function init() {
  $.event.props.push('dataTransfer');
  $('#resource').on('dragstart', handleDragStart);
  $('#dragTarget').on('dragenter', handleDragEnter);
  $('#dragTarget').on('dragover', handleDragOver);
  $('#dragTarget').on('dragleave', handleDragLeave);
  $('#dragTarget').on('drop', handleDrop);
  $('#resource').on('dragend', handleDragEnd);
  $('#resName').on('focus', function () {
    $('#resName').val('');
  });
  
}

function handleDragStart(e) {

  //this.style.opacity='0.4';
  //set the data
  var d = '<div><p>' + $('#resName').val() + ': ' +
  $('#resHours').val() + ' hours</p></div>';
  e.dataTransfer.setData('text/html', d);
  e.dataTransfer.effectAllowed = 'move';
  
}

function handleDragOver(e) {
  if(e.preventDefault) {
    e.preventDefault();
  }
  if(e.dataTransfer){
    e.dataTransfer.dropEffect = 'move';
  }
  
  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  console.log(e.target.classList);
  e.target.classList.add('over');
}

function handleDragLeave(e) {
  e.target.classList.remove('over');  
}
function handleDrop(e) {
  e.preventDefault();
  var target = $( e.target );
  target.removeClass('over');
  target.append(e.dataTransfer.getData('text/html'));
  return false;
}
function handleDragEnd(e) {
  this.style.opacity = 1;  
}