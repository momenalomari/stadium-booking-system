import { Paper, Table, TableBody, TableCell, TableHead, TableRow ,Button } from "@mui/material";
import { useUser } from "../Hooks/useUser.js"; // تأكد من مسار مجلد الهوك

export default function ManageUser() {
    // 1. أضفنا الأقواس المتعرجة (Destructuring) عشان نستخرج المصفوفة صح
    const { users } = useUser(); 

    return (
        <div>
            <h1>Manage Users</h1>
            <Paper elevation={3} sx={{ padding: "20px", marginTop: "20px" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {/* 2. حماية الـ map بإضافة علامة الاستفهام (Optional Chaining) */}
                    {users?.map((user , idx) => (
                        // 3. استخدمنا user._id تبع الـ MongoDB كـ key بدل الـ idx
                        <TableRow > 
                            <TableCell>{idx+1}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell></TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary">
                                    Edit
                                </Button>
                                <Button variant="contained" color="error" sx={{ marginLeft: "10px" }}>
                                    {/* غيرنا لون الحذف لـ error عشان يطلع أحمر منطقي أكثر من secondary */}
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </Paper>
        </div>
    );
}