import mysql, {MysqlError, PoolConnection} from 'mysql';

export const pool=mysql.createPool({
  host:'13.70.105.218',
  port:3306,
  password:'Zhaoying@8604',
  database:'aupost_project'
});
const getMysqlConnection=()=>{
  return pool.getConnection((err:MysqlError,connection:PoolConnection)=>{
    if(err){
      console.error('error connecting: ', err.stack);
      return;
    }
    console.log('successfully connected to aupost_project');
    connection.release();
  });
};

export default getMysqlConnection;
