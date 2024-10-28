const group = [
  {
    groupName: 'Group 1',
    members: 3,
    attendance_code: '123',
    attendance: false
  },
  {
    groupName: 'Group 2',
    members: 2,
    attendance_code: '456',
    attendance: false
  },
  {
    groupName: 'Group 3',
    members: 3,
    attendance_code: '789',
    attendance: false
  }
]
export const getGroupData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return group
}
export const updateGroupData = async (data) => {
  await new Promise(resolve => setTimeout((resolve), 1000))
  group.forEach(element => {
    element.groupName === data.groupName ? element.attendance = data.attendance : null
  });
}
console.log(group);
