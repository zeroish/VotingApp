angular.module('app').controller('mvVoteCtrl', function($scope, $location, dbOps) {
    
    $scope.voter = "";
    $scope.scores = [],[];

    $scope.categories = [
        {
            name: "Concept",
            description: "What is the real world context of the solution? Which problem is it trying to solve? How is it making life better? Why would anyone else care?"
        },
        {
            name: "Implementation",
            description: "What did the team do? How far did they get? Which technical hurdles did they overcome?"
        },
        {
            name: "Technical Novelty",
            description: "Is the team using technology which they are unfamiliar with or is this just a bunch of people doing their day job? Is the team using new and emerging technology"
        },
        {
            name: "Presentation",
            description: "How well did the team describe the concept, implementation and technical novelty of the solution? Did I understand it? Was it interesting? Was it memorable?"
        }
    ]

    $scope.things = [
        {
            name: "Coding For Food",
            description: "",
            members: [
                {
                    name: "scott hulme",
                    captain: "true"
                },
                {name: "Chris Kane"},
                {name: "Michael Purdy"},
        ]},
        {
            name: "Youse’uns Want Lunch",
            description: "",
            members: [
                {
                    name: "laura soutar",
                    captain: "true",
                }
        ]},
        {
            name: "Left4Dev",
            description: "",
            members: [
                {
                    name: "niall mckeown",
                    captain: "true"
                }
        ]},
        {
            name: "Toni&Guys",
            description: "",
            members: [
                {
                    name: "toni kim",
                    captain: "true",
                }
        ]},
        {
            name: "Google's Home Boyz!",
            description: "",
            members: [
                {
                    name: "colin campbell",
                    captain: "true",
                }
        ]},
        {
            name: "ZZ Bottom",
            description: "",
            members: [
                {
                    name: "emily lawes",
                    captain: "true",
                }
        ]}
    ]
    
    $scope.isListed = function(value) {
        for(i = 0; i < $scope.things.length; i++) {
            var project = $scope.things[i];
            for(x = 0; x < project.members.length; x++) {
                if(value == project.members[x].name) {
                    if(project.members[x].captain == 'true') {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    $scope.isMemberOf = function(name, projName) {
        for(i = 0; i < $scope.things.length; i++) {
            var project = $scope.things[i];
            if(project.name == projName) {
                var members = project.members;
                for(x = 0; x < members.length; x++) {
                    if(name == members[x].name) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    $scope.vote = function() {
        for(score in $scope.scores) {       
            var newVote = {
                voter: $scope.voter,
                project: score,
                concept: $scope.scores[score]['concept'],
                implementation: $scope.scores[score]['implementation'],
                technical: $scope.scores[score]['technical'],
                presentation: $scope.scores[score]['presentation'],
            };
            
            dbOps.createVote(newVote).then(function() {
                $location.path('/');
            }, function(reason) {
                console.log("failed to add vote");
            });
        }
    }
});