const  luwak  =  membutuhkan ( "luwak" ) ;
membutuhkan ( "dotenv" ) . konfigurasi ( ) ;

const  dbURL  =  proses . env . MONGO_DB_URL ;

const  configDatabase  =  async ( )  =>  {
       {
           luwak . hubungkan ( dbURL ,  {
            gunakanNewUrlParser : benar ,
            useUnifiedTopology : benar ,
        } ) ;
        konsol . log ( "Database terhubung" ) ;
    }  tangkap  ( salah )  
    {
        konsol . log ( salah ) ;
        proses . keluar ( 1 ) ;
    }
} ;

modul . ekspor  =  configDatabase ;