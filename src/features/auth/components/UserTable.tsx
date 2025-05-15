import { useRegisterStore } from "@/app/stores/registerStore"
import { useEffect } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const UserTable = () => {
  const { getUsers, users, isLoading} = useRegisterStore()
  useEffect(() => {
    getUsers()
  }
    , [getUsers])
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <Table className="container h-full w-full overflow-hidden">
      <TableCaption>Lista de usuarios</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Email</TableHead>
          <TableHead className="text-center">Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.email}</TableCell>
            <TableCell >
              {user.role}
            </TableCell>
            <TableCell className="text-right">
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default UserTable