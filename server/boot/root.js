'use strict';


module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  var ds = server.datasources.mysql;

  router.get('/', server.loopback.status());

  router.get('/tiempoObtenerTitulo', (req, res) => {
    var parametro1 = req.query.year;
    ds.connector.query("SELECT  COUNT( DISTINCT PERSONA.PERSONA_ID) AS CANTIDAD, "+
        "EXTRACT(YEAR FROM FORMACION.FORMACION_FEXPED_TITULO)- "+
        "EXTRACT(YEAR FROM FORMACION.FORMACION_FEGRESO) AS TIEMPO "+
        "FROM FORMACION JOIN PERSONA ON "+
        "FORMACION.PERSONA_ID = PERSONA.PERSONA_ID  "+
        "JOIN PROGRAMA_ACADEMICO ON PROGRAMA_ACADEMICO.PROGRAMA_ID = FORMACION.PROGRAMA_ID "+
        "JOIN FACULTAD ON PROGRAMA_ACADEMICO.FACULTAD_ID= FACULTAD.FACULTAD_ID  "+
        "WHERE EXTRACT(YEAR FROM FORMACION.FORMACION_FINGRESO) = "+parametro1+" AND FACULTAD.FACULTAD_ID=20 "+
        "GROUP BY EXTRACT(YEAR FROM FORMACION.FORMACION_FEXPED_TITULO)- "+
        "EXTRACT(YEAR FROM FORMACION.FORMACION_FEGRESO) ;", null, (err, obj) => {
      if(err) return res.json(err);
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });
  
  router.get('/vistaDos', (req, res) => {
    var parametro2 = req.query.year;
    ds.connector.query("SELECT COUNT(DISTINCT PERSONA.PERSONA_ID) AS CANTIDAD, TIPO.TIPO_DESC FROM PERSONA JOIN FORMACION ON "+
    " PERSONA.PERSONA_ID= FORMACION.PERSONA_ID JOIN   PROGRAMA_ACADEMICO ON PROGRAMA_ACADEMICO.PROGRAMA_ID ="+
     " FORMACION.PROGRAMA_ID JOIN TIPO ON TIPO.TIPO_ID = PROGRAMA_ACADEMICO.TIPO_ID " +
    " JOIN FACULTAD ON FACULTAD.FACULTAD_ID= PROGRAMA_ACADEMICO.FACULTAD_ID "+
    " WHERE EXTRACT(YEAR FROM FORMACION.FORMACION_FINGRESO) = "+parametro2+" AND FACULTAD.FACULTAD_ID=20"+
    " GROUP BY TIPO.TIPO_DESC ;", null, (err, obj) => {
      if(err) return res.json(err);
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });
  router.get('/vistaTres', (req, res) => {
    var parametro1 = req.query.year;
    ds.connector.query("SELECT COUNT(DISTINCT PERSONA.PERSONA_ID) AS CAMPO FROM PERSONA" +
    " LEFT JOIN EXPERIENCIA_LABORAL ON EXPERIENCIA_LABORAL.PERSONA_ID= PERSONA.PERSONA_ID " + 
    " UNION SELECT COUNT(DISTINCT PERSONA.PERSONA_ID) FROM PERSONA RIGHT JOIN"+ 
    " EXPERIENCIA_LABORAL ON EXPERIENCIA_LABORAL.PERSONA_ID= PERSONA.PERSONA_ID"+ 
    " JOIN FORMACION ON FORMACION.PERSONA_ID = PERSONA.PERSONA_ID"+ 
    " JOIN  PROGRAMA_ACADEMICO ON PROGRAMA_ACADEMICO.PROGRAMA_ID"+
    " = FORMACION.PROGRAMA_ID JOIN TIPO ON TIPO.TIPO_ID = PROGRAMA_ACADEMICO.TIPO_ID"+
    " JOIN FACULTAD ON FACULTAD.FACULTAD_ID= PROGRAMA_ACADEMICO.FACULTAD_ID"+
    " WHERE EXTRACT(YEAR FROM FORMACION.FORMACION_FINGRESO) = "+parametro1+" AND FACULTAD.FACULTAD_ID=20;", null, (err, obj) => {
      if(err) return res.json(err);
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });
  router.get('/vistaCuatro', (req, res) => {
    var parametro1 = req.query.year;
    ds.connector.query("SELECT    COUNT( DISTINCT PERSONA.PERSONA_ID) AS CANTIDAD, "+
        " TIPO_CONTRATO.TIPOCONTRATO_DESC AS TIPO FROM  PERSONA  "+
        " JOIN EXPERIENCIA_LABORAL ON EXPERIENCIA_LABORAL.PERSONA_ID= PERSONA.PERSONA_ID "+
        " JOIN TIPO_CONTRATO ON TIPO_CONTRATO.TIPOCONTRATO_ID  = EXPERIENCIA_LABORAL.TIPOCONTRATO_ID "+
        "JOIN FORMACION ON FORMACION.PERSONA_ID = PERSONA.PERSONA_ID "+
        " JOIN  PROGRAMA_ACADEMICO ON PROGRAMA_ACADEMICO.PROGRAMA_ID "+
        "= FORMACION.PROGRAMA_ID"+
        " JOIN FACULTAD ON FACULTAD.FACULTAD_ID= PROGRAMA_ACADEMICO.FACULTAD_ID"+
        " WHERE EXTRACT(YEAR FROM FORMACION.FORMACION_FINGRESO) = "+parametro1+" AND FACULTAD.FACULTAD_ID=20" +
         " GROUP BY TIPO_CONTRATO.TIPOCONTRATO_DESC;", null, (err, obj) => {
      if(err) return res.json(err);
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });
  router.get('/vistaCinco', (req, res) => {
    var parametro1 = req.query.year;
    ds.connector.query(" SELECT COUNT(DISTINCT PERSONA.PERSONA_ID) AS CANTIDAD FROM PERSONA "+
         " LEFT JOIN EXPERIENCIA_LABORAL ON EXPERIENCIA_LABORAL.PERSONA_ID= PERSONA.PERSONA_ID "+
         " JOIN FORMACION  ON PERSONA.PERSONA_ID= FORMACION.PERSONA_ID "+
         " JOIN   PROGRAMA_ACADEMICO ON PROGRAMA_ACADEMICO.PROGRAMA_ID "+
         " = FORMACION.PROGRAMA_ID"+
         " JOIN FACULTAD ON FACULTAD.FACULTAD_ID= PROGRAMA_ACADEMICO.FACULTAD_ID"+
         " WHERE EXTRACT(YEAR FROM FORMACION.FORMACION_FINGRESO) = "+ parametro1 +"   AND FACULTAD.FACULTAD_ID=20"+
         " UNION SELECT COUNT(DISTINCT PERSONA.PERSONA_ID) AS CANTIDAD FROM PERSONA RIGHT JOIN "+
         " EXPERIENCIA_LABORAL ON EXPERIENCIA_LABORAL.PERSONA_ID= PERSONA.PERSONA_ID "+
         " JOIN FORMACION  ON PERSONA.PERSONA_ID= FORMACION.PERSONA_ID "+
         " JOIN   PROGRAMA_ACADEMICO ON PROGRAMA_ACADEMICO.PROGRAMA_ID "+
         "= FORMACION.PROGRAMA_ID " +
         " JOIN FACULTAD ON FACULTAD.FACULTAD_ID= PROGRAMA_ACADEMICO.FACULTAD_ID"+
         " WHERE EXPERIENCIA_LABORAL.AREA_ID <>23 AND EXTRACT(YEAR FROM FORMACION.FORMACION_FINGRESO) ="+ parametro1 +" "+
         " AND FACULTAD.FACULTAD_ID=20;", null, (err, obj) => {
      if(err) return res.json(err);
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });
  router.get('/vistaSeis', (req, res) => {
    ds.connector.query("SELECT COUNT(*) AS CANTIDAD FROM PERSONA JOIN FORMACION ON "+
    " PERSONA.PERSONA_ID= FORMACION.PERSONA_ID JOIN PROGRAMA_ACADEMICO ON PROGRAMA_ACADEMICO.PROGRAMA_ID = FORMACION.PROGRAMA_ID "+
    " JOIN FACULTAD ON PROGRAMA_ACADEMICO.FACULTAD_ID= FACULTAD.FACULTAD_ID ;", null, (err, obj) => {
      if(err) return res.json(err);
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });
  router.get('/vistaSiete', (req, res) => {
    ds.connector.query(" call usp_egresados_porcentaje(); ", null, function(err, obj) {
      if(err) return res.json(err); 
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj[0]);
    });
  });


   router.get('/vistaOcho', (req, res) => {
         var parametro1 = req.query.year;

    ds.connector.query("  SELECT COUNT(DISTINCT PERSONA.PERSONA_ID) AS CANTIDAD, EXTRACT(YEAR FROM FORMACION.FORMACION_FEGRESO) AS EGRESO  FROM PERSONA JOIN FORMACION ON "+
        " PERSONA.PERSONA_ID= FORMACION.PERSONA_ID JOIN   PROGRAMA_ACADEMICO ON PROGRAMA_ACADEMICO.PROGRAMA_ID "+
        " = FORMACION.PROGRAMA_ID JOIN TIPO ON TIPO.TIPO_ID = PROGRAMA_ACADEMICO.TIPO_ID"+
        " JOIN FACULTAD ON FACULTAD.FACULTAD_ID= PROGRAMA_ACADEMICO.FACULTAD_ID"+
        " WHERE EXTRACT(YEAR FROM FORMACION.FORMACION_FINGRESO) = "+ parametro1 +" "+
        " AND FACULTAD.FACULTAD_ID=20"+
        " GROUP BY EXTRACT(YEAR FROM FORMACION.FORMACION_FEGRESO) ;", null, function(err, obj) {
              if(err) return res.json(err); 
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });


  router.get('/vistaNueve', (req, res) => {
         var parametro1 = req.query.year;

          ds.connector.query(" SELECT COUNT(DISTINCT PERSONA.PERSONA_ID) AS CANTIDAD, EXTRACT(YEAR FROM FORMACION.FORMACION_FEGRESO) "+
          " - EXTRACT(YEAR FROM FORMACION.FORMACION_FINGRESO) AS TIEMPO FROM PERSONA JOIN FORMACION ON "+
          "PERSONA.PERSONA_ID= FORMACION.PERSONA_ID JOIN  PROGRAMA_ACADEMICO ON PROGRAMA_ACADEMICO.PROGRAMA_ID "+
          " = FORMACION.PROGRAMA_ID JOIN TIPO ON TIPO.TIPO_ID = PROGRAMA_ACADEMICO.TIPO_ID" +
          " JOIN FACULTAD ON FACULTAD.FACULTAD_ID= PROGRAMA_ACADEMICO.FACULTAD_ID "+
          " WHERE EXTRACT(YEAR FROM FORMACION.FORMACION_FINGRESO) ="+ parametro1 +" "+
          " AND FACULTAD.FACULTAD_ID=20 "+
          " GROUP BY EXTRACT(YEAR FROM FORMACION.FORMACION_FEGRESO) " +
          " - EXTRACT(YEAR FROM FORMACION.FORMACION_FINGRESO) ;", null, function(err, obj) {
              if(err) return res.json(err); 
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });

  router.get('/vistaDiez', (req, res) => {
         var parametro1 = req.query.year;
          ds.connector.query("  SELECT COUNT(DISTINCT PERSONA.PERSONA_ID) AS CANTIDAD, EXTRACT(YEAR FROM FORMACION.FORMACION_FINGRESO)"+ 
            " AS INGRESO FROM PERSONA JOIN FORMACION ON"+ 
            " PERSONA.PERSONA_ID= FORMACION.PERSONA_ID JOIN   PROGRAMA_ACADEMICO ON PROGRAMA_ACADEMICO.PROGRAMA_ID"+
            " = FORMACION.PROGRAMA_ID JOIN TIPO ON TIPO.TIPO_ID = PROGRAMA_ACADEMICO.TIPO_ID"+
            " JOIN FACULTAD ON FACULTAD.FACULTAD_ID= PROGRAMA_ACADEMICO.FACULTAD_ID WHERE"+
            " FACULTAD.FACULTAD_ID=20"+
            " GROUP BY EXTRACT(YEAR FROM FORMACION.FORMACION_FINGRESO) ;", null, function(err, obj) {
              if(err) return res.json(err); 
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });

  router.get('/vistaOnce', (req, res) => {
         var parametro1 = req.query.year;
          ds.connector.query(" SELECT  CONCAT(PERSONA.PERSONA_APATERNO, ' ',PERSONA.PERSONA_AMATERNO) AS 'APELLIDOS',"+
          " PERSONA.PERSONA_NOMBRES AS 'NOMBRE', EXTRACT(YEAR FROM FORMACION.FORMACION_FINGRESO) AS "+
          " 'INGRESO' ,EXTRACT(YEAR FROM FORMACION.FORMACION_FINGRESO) AS 'EGRESO' "+
          " FROM PERSONA JOIN FORMACION ON"+ 
          " PERSONA.PERSONA_ID= FORMACION.PERSONA_ID JOIN   PROGRAMA_ACADEMICO ON PROGRAMA_ACADEMICO.PROGRAMA_ID"+
          " = FORMACION.PROGRAMA_ID JOIN TIPO ON TIPO.TIPO_ID = PROGRAMA_ACADEMICO.TIPO_ID"+
          " JOIN FACULTAD ON FACULTAD.FACULTAD_ID= PROGRAMA_ACADEMICO.FACULTAD_ID"+
          " WHERE  FACULTAD.FACULTAD_ID=20;", null, function(err, obj) {
              if(err) return res.json(err); 
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });

  router.get('/vistaDoce', (req, res) => {
         var parametro1 = req.query.year;
          ds.connector.query("SELECT COUNT( DISTINCT F.PERSONA_ID) AS 'CANTIDAD',EXTRACT(YEAR FROM F.FORMACION_FINGRESO) AS 'INGRESO', FA.FACULTAD_DESC_MIN AS 'FACULTAD'"+
          " FROM FORMACION F JOIN PERSONA P ON"+
          " P.PERSONA_ID = F.PERSONA_ID JOIN PROGRAMA_ACADEMICO PA ON"+
          " PA.PROGRAMA_ID = F.PROGRAMA_ID JOIN FACULTAD FA ON"+
          " FA.FACULTAD_ID = PA.FACULTAD_ID"+
          " WHERE FA.FACULTAD_ID = 20" +
          " GROUP BY EXTRACT(YEAR FROM F.FORMACION_FINGRESO);", null, function(err, obj) {
              if(err) return res.json(err); 
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });

  router.get('/vistaTrece', (req, res) => {
         var parametro1 = req.query.year;
          ds.connector.query("SELECT COUNT(F.PERSONA_ID) AS 'CANTIDAD', EXTRACT(YEAR FROM F.FORMACION_FEXPED_GRADO) AS 'EXPEDICION DE GRADO', FA.FACULTAD_DESC_MIN AS 'FACULTAD'"+
          " FROM FORMACION F JOIN PERSONA P ON"+
          " P.PERSONA_ID = F.PERSONA_ID JOIN PROGRAMA_ACADEMICO PA ON"+
          " PA.PROGRAMA_ID = F.PROGRAMA_ID JOIN FACULTAD FA ON"+
          " FA.FACULTAD_ID = PA.FACULTAD_ID"+
          " WHERE FA.FACULTAD_ID = 20"+
          " GROUP BY EXTRACT(YEAR FROM F.FORMACION_FEXPED_GRADO), FA.FACULTAD_DESC_MIN ;", null, function(err, obj) {
              if(err) return res.json(err); 
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });


  router.get('/vistaCatorce', (req, res) => {
         var parametro1 = req.query.year;
          ds.connector.query(" SELECT COUNT(F.PERSONA_ID) AS 'NUMERO DE PERSONAS', EXTRACT(YEAR FROM F.FORMACION_FEGRESO) AS 'EGRESO', FA.FACULTAD_DESC_MIN AS 'FACULTAD'"+
            " FROM FORMACION F JOIN PERSONA P ON"+
            " P.PERSONA_ID = F.PERSONA_ID JOIN PROGRAMA_ACADEMICO PA ON"+
            " PA.PROGRAMA_ID = F.PROGRAMA_ID JOIN FACULTAD FA ON"+
            " FA.FACULTAD_ID = PA.FACULTAD_ID"+
            " WHERE FA.FACULTAD_ID = 20"+
            " GROUP BY EXTRACT(YEAR FROM F.FORMACION_FEGRESO), FA.FACULTAD_DESC_MIN; ", null, function(err, obj) {
              if(err) return res.json(err); 
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });

  router.get('/vistaQuince', (req, res) => {
         var parametro1 = req.query.year;
          ds.connector.query(" SELECT COUNT(F.PERSONA_ID) AS 'CANTIDAD', EXTRACT(YEAR FROM F.FORMACION_FEGRESO) AS 'EGRESO', FA.FACULTAD_DESC_MIN AS 'FACULTAD'"+
          " FROM FORMACION F JOIN PERSONA P ON"+
          " P.PERSONA_ID = F.PERSONA_ID JOIN PROGRAMA_ACADEMICO PA ON"+
          " PA.PROGRAMA_ID = F.PROGRAMA_ID JOIN FACULTAD FA ON"+
          " FA.FACULTAD_ID = PA.FACULTAD_ID"+
          " WHERE FA.FACULTAD_ID = 20 AND  EXTRACT(YEAR FROM F.FORMACION_FINGRESO)= "+parametro1+ " GROUP BY EXTRACT(YEAR FROM F.FORMACION_FEGRESO), FA.FACULTAD_DESC_MIN; ",
           null, function(err, obj) {
              if(err) return res.json(err); 
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });

  server.use(router);
};
