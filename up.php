<?php
	/**
	 * Function update menu items
	 */
	// print_r($_REQUEST);
	if($_REQUEST['add']) {
		function up() {
			$jsonString = file_get_contents('routes.json');
			$data = json_decode($jsonString, true);
			// $data[0]['name'] = "Home";
			// foreach ($data as $key => $entry) {
			    // if ($entry['activity_code'] == '1') {
			    //     $data[$key]['activity_name'] = "TENNIS";
			    // }
			// }
			$i = count($data)+1;
			$data[$i] = array(
				'name' => "Item add: ".$i,
				'url' => "/item-".$i,
				'template' => "Wha-hah! This is a ".$i." page from dynamic loaded js & php",
				'menu' => "top"
			);

			//Save
			$newJsonString = json_encode($data);
			file_put_contents('routes.json', $newJsonString);
			return $data;
		}
		print_r(  up() );
	}
	else if($_REQUEST['clean']) {
		function clean() {
			$standart = file_get_contents('sample_routes.json');
			//Save
			file_put_contents('routes.json', $standart);
			return $standart;
		}
		print_r(  clean() );
	}else {
		print_r("Bad request :(");
	}
?>