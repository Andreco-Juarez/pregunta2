<?php
    header('Content-Type: application/json; charset=utf-8');

    function resToJSON($res){
        $data = array(
            "respuesta" => $res["respuesta"],
            "boolCorrect" => $res["boolCorrect"],
        );

        return $data;
    }


    include("./config.php");
    $conexion = connect();

    $json = trim(file_get_contents("php://input"));
    $decode = json_decode($json, true);

    $materia = $decode["materia"];

    $peticion = "SELECT * FROM preguntas INNER JOIN materias ON materias.id_materia = preguntas.id_materia WHERE materia = '$materia'";
    mysqli_real_escape_string($conexion, $peticion);
    $query = mysqli_query($conexion, $peticion);
    $preguntas = [];
    while($row = mysqli_fetch_array($query, MYSQLI_ASSOC))
    {
        array_push($preguntas, $row);
    }


    $indice = array_rand($preguntas);
    $preguntaSelect = $preguntas[$indice];
    $id_pregunta = $preguntaSelect["id_pregunta"];

    $peticion = "SELECT * FROM respuestas WHERE id_pregunta = $id_pregunta";
    mysqli_real_escape_string($conexion, $peticion);
    $query = mysqli_query($conexion, $peticion);
    $respuestas = [];
    while($row = mysqli_fetch_array($query, MYSQLI_ASSOC))
    {
        array_push($respuestas, $row);
    }

    $resInJSON = array(
        "res1" => resToJSON($respuestas[0]),
        "res2" => resToJSON($respuestas[1]),
        "res3" => resToJSON($respuestas[2]),
        "res4" => resToJSON($respuestas[3])
    );

    $data = array(
        "pregunta" => $preguntaSelect["pregunta"],
    );

    $data = array_merge($data,$resInJSON);

    //var_dump($data);

    $json = json_encode($data);

    // Imprimir el JSON
    echo $json; 
?>