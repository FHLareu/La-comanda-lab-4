<?php

    require_once './src/BaseDeDatos.php';
    use \Firebase\JWT\JWT;

    class Usuario {

        public static function Logear($request, $response) {

            $datosUsuario = $request->getParsedBody();
            $datosUsuario["nombre"] = $request->getAttribute('nombre');
            $datosUsuario["apellido"] = $request->getAttribute('apellido');
            $datosUsuario["tipo"] = $request->getAttribute('tipo');

            $key = "12345";
            $token = array(
                "correo" => $datosUsuario["correo"],
                "nombre" => $datosUsuario["nombre"],
                "apellido" => $datosUsuario["apellido"],
                "clave" => $datosUsuario["clave"],
                "tipo" => $datosUsuario["tipo"]
            );

            $jwt = JWT::encode($token, $key);

            $response->getBody()->write('{"token":"'.$jwt.'"}');
        }

        public static function Registrar($request, $response) {

            $datosUsuario = $request->getParsedBody();
            $conexion = $request->getAttribute('conexion');

            $consulta = "INSERT INTO `usuarios`(`correo`, `nombre`, `apellido`, `clave`, `tipo`) VALUES (
                '".$datosUsuario["correo"]."',
                '".$datosUsuario["nombre"]."',
                '".$datosUsuario["apellido"]."',
                '".$datosUsuario["clave"]."',
                '".$datosUsuario["tipo"]."')";

            $resultados = $conexion->prepare($consulta);
            $resultados->execute();
            $response->getBody()->write('{"valido":"true"}');
            return $response;
        }


    }

?>