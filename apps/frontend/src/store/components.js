import { atom } from 'recoil' 

const isAccountPopupDisplayed = atom({
  key: 'isAccountPopupDisplayed',
  default: false
})

// const isAccountPopupDisplayed = atom({
//     key: 'isAccountPopupDisplayed',
//     default: false,
//     effects_UNSTABLE: [
//         async ({onSet}) => {
//           const fetchGet = useFetch();
//           const setAccount = await useSetRecoilState(accountDataState);
//           onSet(async newValue => {
//             if(newValue){
//                 const accountData = await fetchGet('/users/account');
//                 if(accountData){
//                     setAccount(accountData);
//                 }
//             }
//           });
//         },
//       ],
// })

const isAddNewPostPopupDisplayed = atom({
    key: 'isAddNewPostPopupDisplayed',
    default: false
})

const isDeletePostPopupDisplayedState = atom({
  key: 'isDeletePostPopupDisplayedState',
  default: false
})

const isPostPopupDisplayedState = atom({
  key: 'isPostPopupDisplayedState',
  default: false
})


export {
    isAccountPopupDisplayed,
    isAddNewPostPopupDisplayed,
    isDeletePostPopupDisplayedState,
    isPostPopupDisplayedState,
} 