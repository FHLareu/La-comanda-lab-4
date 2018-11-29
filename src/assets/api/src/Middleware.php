<?php

    require_once './src/BaseDeDatos.php';
    use \Firebase\JWT\JWT;

    class Middleware {

        public static function VerificarExistencia($request, $response, $next) {

            $datos = BaseDeDatos::$datos;
            $user  = BaseDeDatos::$user;
            $pass  = BaseDeDatos::$pass;
            $url   = BaseDeDatos::$url;
            $datosUsuario = $request->getParsedBody();

            try {
            
                $conexion = new PDO($datos, $user, $pass);
                
                if($request->getAttribute('routeInfo')["request"][1] == $url) {

                    $resultados = $conexion->prepare("SELECT * FROM `usuarios` WHERE `correo`='".$datosUsuario["correo"]."' and `clave`='".$datosUsuario["clave"]."'");
                    $resultados->execute();

                    if($fila = $resultados->fetch(PDO::FETCH_ASSOC)) {

                        $request = $request->withAttribute('nombre', $fila["nombre"]);
                        $request = $request->withAttribute('apellido', $fila["apellido"]);
                        $request = $request->withAttribute('tipo', $fila["tipo"]);
                        $response = $next($request, $response);
                    } else {
                
                        $response->getBody()->write('{"valido":"false","mensaje":"Correo o contraseña incorrectos."}');
                    }

                } else {

                    $resultados = $conexion->prepare("SELECT * FROM `usuarios` WHERE `correo`='".$datosUsuario["correo"]."'");
                    $resultados->execute();

                    if(!$fila = $resultados->fetch(PDO::FETCH_ASSOC)) {

                        $request = $request->withAttribute('conexion', $conexion);
                        $response = $next($request, $response);
                    } else {
                
                        $response->getBody()->write('{"valido":"false","mensaje":"Este usuario ya existe."}');
                    }
                }

                $conexion = null;
            }
            catch(Exception $exception) {
            
                $response->getBody()->write('{"valido":"false","mensaje":"Se ha atrapado una excepcion: '.$exception->getMessage().'"}');
            }

            return $response;
        }

        public static function VerificarJWT($request, $response, $next, $token) {

            try {

                $JWTdecodeado = JWT::decode($token, "12345", array('HS256'));
                $response = $next($request, $response);
            } catch(Exception $error) {

                $response->getBody()->write('{"valido":"false","mensaje":"Tú información de sesión no es válida."}');
            }

            return $response;
        }
    }

?>