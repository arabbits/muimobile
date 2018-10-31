<?php
	$result = array();
	if ((($_FILES["file"]["type"] == "image/gif")
	|| ($_FILES["file"]["type"] == "image/jpeg")
	|| ($_FILES["file"]["type"] == "image/pjpeg")
	|| ($_FILES["file"]["type"] == "image/png")
	|| ($_FILES["file"]["type"] == "image/jpg"))
	&& ($_FILES["file"]["size"] < 20000000))
	{
		if ($_FILES["file"]["error"] > 0)
		{
			$result['code'] = 0;
			$result['result'] = false;
			$result['msg'] = "Return Code: " . $_FILES["file"]["error"];
			$jResult = json_encode($result, JSON_UNESCAPED_UNICODE);
			echo $jResult;
		}
		else
		{
			if (file_exists("upload/" . $_FILES["file"]["name"]))
			{
				$result['code'] = 0;
				$result['result'] = false;
				$result['msg'] = $_FILES["file"]["name"] . " already exists. ";
				$jResult = json_encode($result, JSON_UNESCAPED_UNICODE);
				echo $jResult;
			}
			else
			{
				//新文件名
				$newpath = date("yyyyMMddHHmmssSSS");
				$extension = explode('.', $_FILES["file"]["name"]);
			// 	if(strpos($_FILES["file"]["name"],'.') !== false){
			// 		$newfile = "upload/" . $newpath.'.'.$extension[1];
			// 　　}else{
			// 		$newfile = "upload/" . $newpath.'.png';
			// 　　}
				$newfile = "upload/" . $newpath.'.png';
				move_uploaded_file($_FILES["file"]["tmp_name"],$newfile);
				
				header("Content-type: text/html; charset=utf-8");
			    include_once 'api-gateway-demo-sign-php/Util/Autoloader.php';
			    
			    function doPost($url, $appKey, $appSecret, $bodyContent) {
			        //域名后、query前的部分
			        $urlEles = parse_url($url);
			        $host = $urlEles["scheme"] . "://" . $urlEles["host"];
			        $path = $urlEles["path"];
			        $request = new HttpRequest($host, $path, HttpMethod::POST, $appKey, $appSecret);
			    
			        //设定Content-Type，根据服务器端接受的值来设置
			        $request->setHeader(HttpHeader::HTTP_HEADER_CONTENT_TYPE, ContentType::CONTENT_TYPE_JSON);
			    
			        //设定Accept，根据服务器端接受的值来设置
			        $request->setHeader(HttpHeader::HTTP_HEADER_ACCEPT, ContentType::CONTENT_TYPE_JSON);
			    
			        //注意：业务body部分，不能设置key值，只能有value
			        if (0 < strlen($bodyContent)) {
			            $request->setHeader(HttpHeader::HTTP_HEADER_CONTENT_MD5, base64_encode(md5($bodyContent, true)));
			            $request->setBodyString($bodyContent);
			        }
			    
			        //指定参与签名的header
			        $request->setSignHeader(SystemHeader::X_CA_TIMESTAMP);
			        $response = HttpClient::execute($request);
			        return $response;
			    }
			    
			    $appKey = "24970758";
			    $appSecret = "bef414267628b8635ba78f0f23d31b44";
			    $url = "https://ocrcp.market.alicloudapi.com/rest/160601/ocr/ocr_vehicle_plate.json";
			    $file = $newfile; // 文件路径 
//			    var_dump($file);die;
			    
			    //如果输入带有inputs, 设置为True，否则设为False
			    $is_old_format = false;
			    
			    //如果没有configure字段，config设为空
			    $config = array(
			        "side" => "face"
			    );
			
			    if($fp = fopen($file, "rb", 0)) { 
			        $binary = fread($fp, filesize($file)); // 文件读取
			        fclose($fp); 
			        $base64 = base64_encode($binary); // 转码
			    }
			
			    if($is_old_format == TRUE){
			        $request = array();
			        $request["image"] = array(
			                "dataType" => 50,
			                "dataValue" => "$base64"
			        );
			
			        if(count($config) > 0){
			            $request["configure"] = array(
			                    "dataType" => 50,
			                    "dataValue" => json_encode($config) 
			                );
			        }
			        $body = json_encode(array("inputs" => array($request)));
			    }else{
			        $request = array(
			            "image" => "$base64"
			        );
			        if(count($config) > 0){
			            $request["configure"] = json_encode($config);
			        }
			        $body = json_encode($request);
			    }
			    $response = doPost($url, $appKey, $appSecret, $body);
			    $stat = $response->getHttpStatusCode();
			    if($stat == 200){
			        if($is_old_format){
			            $output = json_decode($response->getBody(), true);
			            $result_str = $output["outputs"][0]["outputValue"]["dataValue"];
			        }else{
			            $result_str = $response->getBody();
			        }
					$results = json_decode($result_str, true);
					if(isset($results['plates'][0]['txt'])){
						$result['code'] = 0;
						$result['result'] = true;
						$result['msg'] = $results['plates'][0]['txt'];
						$jResult = json_encode($result, JSON_UNESCAPED_UNICODE);
						echo $jResult;
					}else{
						$result['code'] = 0;
						$result['result'] = false;
						$result['msg'] = $results;
						$jResult = json_encode($result, JSON_UNESCAPED_UNICODE);
						echo $jResult;
					}
			    }else{
					$result['code'] = 0;
					$result['result'] = false;
					$result['msg'] = "Http error code: ".$stat;
					$jResult = json_encode($result, JSON_UNESCAPED_UNICODE);
					echo $jResult;
				}
			}
		}
	}
	else
	{
		$result['code'] = 0;
		$result['result'] = false;
		$result['msg'] = "Invalid file";
		$jResult = json_encode($result, JSON_UNESCAPED_UNICODE);
		echo $jResult;
	}
?>