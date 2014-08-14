var contactListApp = angular.module('contactListApp', []);

contactListApp.controller('ContactsController', function($scope, $http) {
    $http.get('/api/contacts').success(function(data) {
        $scope.contacts = data;
    });

    $scope.formData = {};

    $scope.processForm = function() {
        $http.post('/api/contacts/save', $scope.formData)
            .success(function(data) {
                $scope.contacts.push(data);
            })
            .error(function(err) {
                console.err('error: ' + err);
            })
    };

    $scope.deleteContact = function(contact) {
        $http.post('/api/contacts/delete', { id: contact._id })
            .success(function(data) {
                var index = $scope.contacts.indexOf(contact);
                $scope.contacts.splice(index, 1);
            })
            .error(function(err) {
                console.error('error: ' + err);
            })
    };
});