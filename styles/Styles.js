import {StyleSheet,StatusBar,Dimensions} from 'react-native';
import {scale,moderateScale,moderateVerticalScale,verticalScale } from 'react-native-size-matters';

import colorThemes from './Colors.js';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    wholeContainer:{
      flex: 1,
      backgroundColor:colorThemes.bgColor,
      paddingTop:StatusBar.currentHeight,
    },
    container: {
        flex: 1,
        backgroundColor:colorThemes.bgColor,
        paddingHorizontal: verticalScale(10), 
      },
      centerAlign:{
        alignItems: 'center',
      },
      centerPage:{
        alignItems: 'center',
        justifyContent:'center',
      },
      topClss:{
        marginTop:moderateScale(7),
      },
      topClss2:{
        marginTop:moderateScale(14),
      },
      normalText:{
        color:colorThemes.fontColor1,
        fontSize: moderateScale(14,0.4), 
      },
      normalText2:{
        color:colorThemes.textFontcolor,
        fontSize:moderateScale(14,0.4), 
      },
      normalText3:{
        color:colorThemes.fontColor2,
        fontSize:moderateScale(14,0.4), 
      },
      headTitle:{
        fontSize: moderateScale(18,0.4), 
        fontWeight: '500', 
        color: colorThemes.headingColor,
      },
      footerStyle:{
        flex:.2,
        backgroundColor:colorThemes.bgColor,
        alignItems:'center',
        justifyContent:'flex-end',
        paddingBottom:verticalScale(15), 
      },
      wholeBorder:{
        marginTop: verticalScale(12),//screenHeight * 0.04,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colorThemes.textBorderColor,
        padding: scale(7),
      },
      dropinputpadding:{
        paddingLeft:moderateScale(16,0.4),
      },
      input: {
        width:scale(310),
        //paddingVertical: 0,
        paddingLeft:moderateScale(5,0.4),
        fontSize:moderateScale(14,0.4),
        height:verticalScale(50),
        marginTop:verticalScale(17),
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colorThemes.textBorderColor,
        color: colorThemes.textFontcolor,
      },
      bottomInput: 
      {
        width:scale(310),
        paddingVertical: 0,
        height:verticalScale(45),
        fontSize:moderateScale(14,0.4), 
        marginTop:verticalScale(20),
        borderBottomWidth:0.4,
        backgroundColor:colorThemes.bgColor,
        borderColor:colorThemes.textBorderColor,
        color:colorThemes.textFontcolor,
      },
      TextInputStyleClass: {
        width:scale(310),
        marginTop:verticalScale(17),
        paddingLeft:moderateScale(10,0.4),
        fontSize:moderateScale(14,0.4),
        borderWidth: 1,
        borderColor:colorThemes.textBorderColor,
        backgroundColor:colorThemes.bgColor,
        borderRadius: 5,
        height:verticalScale(100),
        color:colorThemes.textFontcolor,
        textAlignVertical: 'top',
      },
      inputIcon:{
       // margin: moderateScale(5),
       // alignSelf: 'flex-end',
        marginRight:scale(4),
        alignItems:'center'
      },
      buttonContainer: {
        width:scale(310),
        alignItems: 'center',
        marginVertical:moderateScale(15), 
      },
      btn: {
        backgroundColor:colorThemes.buttonBgcolor,
        width: '100%',
        padding:scale(14), 
        alignItems: 'center',
      },
      buttonText: {
        color:colorThemes.buttonFontcolor,
        fontWeight: '700',
        fontSize: moderateScale(15),
      },
      imageStyle: {
        borderStyle: 'dotted', 
        width:scale(220), 
        height:verticalScale(220), 
        alignItems: 'center',
        borderWidth: 2,
        borderColor:colorThemes.textFontcolor,
        borderRadius: 7,
      },
      image:{
        width:scale(200),
        height:verticalScale(200),
        margin: 5,
      },
      placeholderStyle: {
        color: colorThemes.placeHoldercolor,
        fontSize:moderateScale(14,0.4),
      },
      selectedTextStyle: {
        color: colorThemes.placeHoldercolor,
        fontSize:moderateScale(14,0.4),
      },
      inputSearchStyle: {
        color: colorThemes.textFontcolor,
        fontSize:moderateScale(14,0.4),
      },
      clsTittle: {    //--profile---//
        marginTop:moderateVerticalScale(14,0.4),
        alignItems: 'center',
        backgroundColor:colorThemes.buttonBgcolor,
      },
      clsFont: {
        color:colorThemes.buttonFontcolor,
        fontWeight: "bold",
      },
      tableHeader: {  //--DynTable---//
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: colorThemes.tabHeadercolor,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        height:moderateVerticalScale(50,0.1), //'30@mvs0.3'
      },
      columnHeaderTxt: {
        color:colorThemes.fontColor2,
        fontWeight: "bold",
        fontSize:moderateScale(14,0.4),
      },
      tableRow: {
        flexDirection: "row",
        height:verticalScale(65),
        alignItems: "center",
        justifyContent: "space-evenly",
      },
      modelview: {//Model
        alignItems: 'center',
        marginTop:verticalScale(5),
        shadowColor:colorThemes.headingColor,
        backgroundColor:colorThemes.bgColor,
      },
      Buttoncontainer: {//Image View Boat
        alignItems: "center", 
        justifyContent: "space-evenly", 
        flexDirection: "row",
      },
      square: {
        backgroundColor:colorThemes.textBorderColor,
        width: scale(90),// screenWidth * 0.25,
        height: verticalScale(90),//screenHeight * 0.13,
        alignItems: "center",
        justifyContent: "center"
        // margin: 4,
      },
      iconTextstyle: {
        color:colorThemes.headingColor,
        textAlign: 'center',
        padding:scale(4),
        fontSize:moderateScale(14,0.3), 
      },
      introImageStyle: {
        width: scale(300),
        height: verticalScale(300),
      },
});