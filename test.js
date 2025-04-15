var courseApi = 'http://localhost:3000/courses';

function start() {
    getCourse(renderCourses);

    handleCreateForm();
}

start();

//function
function getCourse(callback){
    fetch(courseApi)
        .then(function(response){
            return response.json();
        })
        .then(callback);
}

function createCourse(data, callback) {
    var option = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    fetch(courseApi, option)
        .then(function(response){
            response.json();
        })
        .then(callback);
}

function handleCourse(id) {
    var option = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    fetch(courseApi + '/' + id, option)
        .then(function(response){
            response.json();
        })
        .then(function(){});
}

function renderCourses(courses) {
    var listCoursesBlock = document.querySelector('#list-courses');
    var htmls = courses.map(function(course){
        return `<li>
            <h4>${course.name}</h4>
            <p>${course.description}</p>
            <button onclick="handleCourse(${course.id})">&times;</button>
        </li>`;
    });
    listCoursesBlock.innerHTML = htmls.join('');
}

function handleCreateForm() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;

        var formData = {
            name: name,
            description: description
        }

        createCourse(formData, getCourse(renderCourses));
    }
}