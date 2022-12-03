export default {
  template:"#Counter",
  data() {
    return { count: 0 }
  },
  methods:{
    increment(){
        this.count++;
    }
  },
}