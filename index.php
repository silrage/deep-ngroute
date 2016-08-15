<?php
    //Simple get links and put to tag
    $links = file_get_contents("routes.json");
    //@TODO when route content tag script replace close tag to <\/script>
    //@see http://frontender.info/json2js/

    /*$ch = curl_init();
    if(!$ch) die("Couldn't initialize a cURL handle");
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, "http://you_site/routes.json");
    $links = curl_exec($ch);
    curl_close($ch);*/

    // var_dump($links);
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Demo ngRouting by HTML5</title>
  <base href="/cdeep/">
  <link rel="stylesheet" href="style.css">
</head>
<body ng-app="app">


<div>
    <menu-top></menu-top>

    <div class="main" id="main-no-space">
        <div id="main-page">
            <div id="wrapper" class="container">
                <div class="container">
                    <div>
                        <menu-left ng-if="hasSidebar" id="sidebar"></menu-left>
                        <div ng-view id="main">loading... </div>
                    </div>

                </div>
            </div>
        </div>
        <div ng-include="'footer.html'" id="footer"></div>
    </div>

    <script src="angular.min.js"></script>
    <script src="angular-route.min.js"></script>
    <script>
        var links = <?=$links;?>;
    </script>
    <script src="app.js"></script>
    <script type="text/ng-template" id="footer.html">
        footer
    </script>

</div>
</body>
</html>
