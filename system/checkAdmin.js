export async function checkAdmin(
sock,
chat,
user
){


try{


if(!chat.endsWith("@g.us"))
return false;



const metadata =
await sock.groupMetadata(chat);



const admins =
metadata.participants
.filter(
p=>p.admin
)
.map(
p=>p.id
);



return admins.includes(user);



}
catch{


return false;


}


}