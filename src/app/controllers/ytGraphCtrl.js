(function () {
    app.controller('ytGraphCtrl', ytGraphCtrl)

    ytGraphCtrl.$inject = ['$scope', 'VisDataSet', 'ytDataService', '$q']
    function ytGraphCtrl($scope, VisDataSet, ytDataService, $q) {
        window.MYSCOPE2 = $scope;
        
        $scope.initialData = [];
        
        $scope.events = {};

        $scope.options = {
            autoResize: true,
            height: '800',
            width: '100%',
            physics:{
                enabled: true
            },
            stabilization: false,
            barnesHut: {
                gravitationalConstant: -80000,
                springConstant: 0.001,
                springLength: 200
            },
            interaction: {
            tooltipDelay: 200,
            hideEdgesOnDrag: true
            }
        };

        $scope.nodes = new vis.DataSet();
        $scope.edges = new vis.DataSet();

//         $scope.nodes.add([
//             { id: 1, label: "item 1" },
//             { id: 2, label: "item 2" }
//         ]);
// 
//         $scope.edges.add([
//             { from: 1, to: 2 }
//         ])

        // $scope.options = {
        //     autoResize: true,
        //     height: '800',
        //     width: '100%'
        // };

        $scope.data = { nodes: $scope.nodes, edges: $scope.edges, options: $scope.options }

        $scope.addNode = function (id, label) {
            $scope.nodes.add({ id: 3, label: label })
            $scope.edges.add({ from: 3, to: 2 })
        }

        $scope.getChannelData = function () {
            var cids = ["UC6nSFpj9HTCZ5t-N3Rm3-HA", "UCqmugCqELzhIMNYnsjScXXw", "UCwmFOfFuvRPI112vR5DNnrA"];
            
            ytDataService.getChannelsBrandingSettings(cids)
                .then(function (res) {
                    
                })
        }
        
        $scope.getChannelCategory = function(){
            var vids = ["LD0x7ho_IYc", "AsACeAkvFLY", "-6NZMAbfmW0"];
            
            ytDataService.getChannelChannelTrailerCategory(vids)
                .then(function(res){
                    console.log(res)
                    })
        }
        
        
        $scope.actuallyGetGetInitialData = function(){
            ytDataService.getAllSubscriptions().then(function(res){
                $scope.initialData = res.map(function(x){
                    return x.snippet.resourceId.channelId;
                })
                console.log(res)
                console.log($scope.initialData)
                $scope.getInitalData()
            })
        }
        
        
        $scope.getInitalData = function(){
            // var cids = ["UC6nSFpj9HTCZ5t-N3Rm3-HA", "UCqmugCqELzhIMNYnsjScXXw", "UCwmFOfFuvRPI112vR5DNnrA"]
            
            $scope.startGetData().then(function(res){
                console.log(res);
                var t0 = performance.now();
                for(var i = 0; i < res.length; i++){ var item = res[i];
                    try {
                        $scope.nodes.add({
                            id : item.id,
                            title : item.data.title,
                            image : item.data.thumbnail,
                            shape : "image",
                            group : item.data.categoryId
                        })
                    } catch (error) {
                        
                    }
                }
                var t1 = performance.now();
                console.log(t0-t1, 'miliseconds')
                var t2 = performance.now();
                for (var i = 0; i < res.length; i++) {
                    var t4 = performance.now();
                    for (var j = 0; j < res[i].links.length; j++) {
                        try {
                            var key = [res[i].id, res[i].links[j]].sort(function(a,b){return a.localeCompare(b)}).join('#')
                            $scope.edges.add({id: key, from: res[i].id, to: res[i].links[j] })
                        }catch(error){
                            
                        }

                    }
                    var t5 = performance.now();
                    console.log(t5-t4, 'miliseconds')
                }
                var t3 = performance.now();
                console.log(t2-t3, 'miliseconds')
            })
        }
        
        $scope.startGetData = function(){
            var defer = $q.defer();
            var cids = $scope.initialData;
            var nodes = [];
            
            $scope.getData(cids).then(function(res){
                nodes.push.apply(nodes, res);
                var nextChannelIds = res.reduce(function(prev, cur){
                    return {links: prev.links.concat(cur.links)}
                }).links;
                return $scope.getData(nextChannelIds)
            }).then(function(res){
                nodes.push.apply(nodes, res);
                defer.resolve(nodes);    
            })
            return defer.promise;
        }
        
        $scope.getData = function(channelIds){
            var defer = $q.defer();

            var nodes = [];
            
            ytDataService.getChannelsBrandingSettings(channelIds).then(function(res){
                console.log(res)
                
                for (var i = 0; i < res.length; i++) { var cur = res[i];
                    nodes.push({
                        id : cur.id,
                        data : {
                            title : cur.brandingSettings.channel.title,
                            description : cur.brandingSettings.channel.description,
                            thumbnail : cur.snippet.thumbnails.default.url,
                            channelTrailerId : cur.brandingSettings.channel.unsubscribedTrailer
                        },
                        links : cur.brandingSettings.channel.featuredChannelsUrls ? cur.brandingSettings.channel.featuredChannelsUrls : []
                    })
                }
                
                var linkedItems = [];
                for(var i = 0; i < res.length; i++){var cur = res[i];
                    linkedItems.push.apply(linkedItems, cur.brandingSettings.channel.featuredChannelsUrls)
                }
                
                var channelTrailerVideoIds = [];
                for(var i = 0; i < res.length; i++){var cur = res[i];
                    channelTrailerVideoIds.push(cur.brandingSettings.channel.unsubscribedTrailer)
                }
                
                console.log(nodes);
                console.log(channelTrailerVideoIds);
                
                
                return ytDataService.getChannelChannelTrailerCategory(channelTrailerVideoIds);
            }).then(function(res){
                
                for(var i = 0; i < nodes.length; i++){ var n = nodes[i];
                    for(var j = 0; j < res.length; j++){ var c = res[j];
                        if(n.id === c.snippet.channelId){
                            n.data.categoryId = c.snippet.categoryId;
                        }
                    }
                    
                }
                defer.resolve(nodes);
                
                console.log(nodes)
                
                console.log(res)
                
                
            })
            
            return defer.promise;
        }
    }
})();

// map all incoming data to this type, create service to do this
// create service to add these to the graph
// var node = {id : cid,data:{img: thumb, title: title }, links : [cids]}
 
