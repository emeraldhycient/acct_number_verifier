<?php
header('Access-Control-Allow-Origin: *');


$token = "paystack private key here";

$cURLConnection = curl_init('https://api.paystack.co/bank');
curl_setopt($cURLConnection, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Authorization: Bearer ' . $token
));
curl_setopt($cURLConnection, CURLOPT_RETURNTRANSFER, true);

$apiResponse = curl_exec($cURLConnection);
curl_close($cURLConnection);

$jsonArrayResponse = json_decode($apiResponse);

echo json_encode($jsonArrayResponse);