import { useState } from "react";
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

const employeesList = [
  {
    id: 1,
    name: "John Doe",
    position: "Owner",
    email: "johndoe@email.com",
    phone: "1234567890",
    dateAdded: "2021-09-01",
    isEditing: false,
  },
  {
    id: 2,
    name: "Jane Doe",
    position: "Staff",
    email: "janedoe@email.com",
    phone: "0987654321",
    dateAdded: "2022-02-16",
    isEditing: false,
  },
  {
    id: 3,
    name: "John Smith",
    position: "Staff",
    email: "",
    phone: "1234567890",
    dateAdded: "2022-02-16",
    isEditing: false,
  },
  {
    id: 4,
    name: "Jane Smith",
    position: "Staff",
    email: "",
    phone: "0987654321",
    dateAdded: "2022-02-16",
    isEditing: false,
  },
  {
    id: 5,
    name: "David Doe",
    position: "Staff",
    email: "",
    phone: "1234567890",
    dateAdded: "2021-09-01",
    isEditing: false,
  },
];

const EmployeeTable = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [employees, setEmployees] = useState(employeesList);

  const handleCheckboxChange = (employeeId) => {
    if (checkedItems.includes(employeeId)) {
      setCheckedItems(checkedItems.filter((id) => id !== employeeId));
    } else {
      setCheckedItems([...checkedItems, employeeId]);
    }
  };

  const handleEdit = (employeeId) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) => {
        if (employee.id === employeeId) {
          return {
            ...employee,
            isEditing: true,
          };
        }
        return employee;
      })
    );
  };

  const handleSave = (employeeId) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) => {
        if (employee.id === employeeId) {
          return {
            ...employee,
            isEditing: false,
          };
        }
        return employee;
      })
    );
  };

  return (
    <TableContainer borderRadius={"1rem"} h={"25rem"} overflowY={"auto"}>
      <Table size={"lg"}>
        <Thead bgColor={"gray.300"}>
          <Tr>
            <Th>
              <Checkbox disabled />
            </Th>
            <Th>Name</Th>
            <Th>Position</Th>

            <Th>Phone</Th>
            <Th>Date Added</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {employees.map((employee) => (
            <Tr key={employee.id} bgColor={employee.isEditing ? "gray.50" : ""}>
              <Td>
                <Checkbox
                  size={"lg"}
                  checked={checkedItems.includes(employee.id)}
                  onChange={() => handleCheckboxChange(employee.id)}
                />
              </Td>

              <Td>
                {employee.isEditing ? (
                  <Editable
                    defaultValue={employee.name}
                    bgColor={employee.isEditing ? "white" : ""}
                    borderRadius={employee.isEditing && "0.25rem"}
                    border={"2px solid lightblue"}
                  >
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                ) : (
                  employee.name
                )}
              </Td>
              <Td>
                {employee.isEditing ? (
                  <Editable
                    defaultValue={employee.position}
                    bgColor={employee.isEditing ? "white" : ""}
                    borderRadius={employee.isEditing && "0.25rem"}
                    border={"2px solid lightblue"}
                  >
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                ) : (
                  employee.position
                )}
              </Td>
              <Td>
                {employee.isEditing ? (
                  <Editable
                    defaultValue={employee.phone}
                    bgColor={employee.isEditing ? "white" : ""}
                    borderRadius={employee.isEditing && "0.25rem"}
                    border={"2px solid lightblue"}
                  >
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                ) : (
                  employee.phone
                )}
              </Td>
              <Td>{employee.dateAdded}</Td>
              <Td display={"flex"} gap={2}>
                {employee.isEditing ? (
                  <Button
                    variant={"ghost"}
                    color={"green.600"}
                    onClick={() => handleSave(employee.id)}
                  >
                    <FaSave style={{ marginRight: "0.25rem" }} /> Save
                  </Button>
                ) : (
                  <Button
                    variant={"ghost"}
                    color={"blue.600"}
                    onClick={() => handleEdit(employee.id)}
                  >
                    <MdEdit style={{ marginRight: "0.25rem" }} /> Edit
                  </Button>
                )}
                <Button variant={"ghost"} color={"red.500"}>
                  <FaTrash style={{ marginRight: "0.25rem" }} /> Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
