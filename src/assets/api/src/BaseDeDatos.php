<?php

    class BaseDeDatos {

        public static $datos = "mysql:host=localhost;dbname=id8008593_comanda";
        public static $user  = "id8008593_root";
        public static $pass  = "comanda";
        public static $url   = "https://comanda-lareu.000webhostapp.com/assets/api/login";

        public static function ListarEntidades($request, $response, $consulta) {

            $datos = BaseDeDatos::$datos;
            $user  = BaseDeDatos::$user;
            $pass  = BaseDeDatos::$pass;
            $url   = BaseDeDatos::$url;
            $entidades = [];

            try {

                $conexion = new PDO($datos, $user, $pass);
                $resultados = $conexion->prepare($consulta);
                $resultados->execute();

                while($fila = $resultados->fetch(PDO::FETCH_ASSOC)) {
                        
                    array_push($entidades , $fila);
                }
  
                $response->getBody()->write('{"entidades":'.json_encode($entidades).'}');
            } catch(Exception $exception) {

                $response->getBody()->write('{"valido":"false","mensaje":"Se ha atrapado una excepcion: '.$exception->getMessage().'"}');
            }

        }

        public static function EjecutarConsulta($request, $response, $consulta) {

            $datos = BaseDeDatos::$datos;
            $user  = BaseDeDatos::$user;
            $pass  = BaseDeDatos::$pass;
            $url   = BaseDeDatos::$url;
            $datosUsuario = $request->getParsedBody();

            try {

                $conexion = new PDO($datos, $user, $pass);
                $resultados = $conexion->prepare($consulta);
                $resultados->execute();
                $response->getBody()->write('{"valido":"true"}');
            } catch(Exception $exception) {

                $response->getBody()->write('{"valido":"false","mensaje":"Se ha atrapado una excepcion: '.$exception->getMessage().'"}');
            }
        }

    }

?>