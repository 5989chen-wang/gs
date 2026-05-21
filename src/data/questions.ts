export interface Question {
  id: string
  chapter: string
  content: string
  options: string[]
  correctIndex: number
  analysis: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface WrongRecord {
  questionId: string
  wrongCount: number
  lastWrongDate: string
  userAnswer: number
}

export interface DailyStat {
  date: string
  questionsDone: number
  correctCount: number
}

export const chapters = [
  { id: 'all', name: '全部章节', icon: 'BookOpen' },
  { id: 'public', name: '公共基础知识', icon: 'BookMarked' },
  { id: 'admin', name: '行政能力测试', icon: 'Briefcase' },
  { id: 'comprehensive', name: '综合应用能力', icon: 'FileText' },
  { id: 'current', name: '时事政治', icon: 'Newspaper' },
  { id: 'law', name: '法律法规', icon: 'Scale' },
]

export const questions: Question[] = [
  {
    id: 'q001',
    chapter: '公共基础知识',
    content: '下列选项中，不属于我国社会主义核心价值观中公民个人层面价值准则的是：',
    options: ['爱国', '敬业', '诚信', '和谐'],
    correctIndex: 3,
    analysis: '社会主义核心价值观分为三个层面：国家层面（富强、民主、文明、和谐）、社会层面（自由、平等、公正、法治）、公民个人层面（爱国、敬业、诚信、友善）。和谐属于国家层面的价值准则。',
    difficulty: 'easy'
  },
  {
    id: 'q002',
    chapter: '公共基础知识',
    content: '我国的根本政治制度是：',
    options: ['人民代表大会制度', '多党合作制度', '民族区域自治制度', '基层群众自治制度'],
    correctIndex: 0,
    analysis: '人民代表大会制度是我国的根本政治制度，是人民民主专政的政权组织形式，是我国的政体。',
    difficulty: 'easy'
  },
  {
    id: 'q003',
    chapter: '公共基础知识',
    content: '科学发展观的第一要义是：',
    options: ['以人为本', '全面协调可持续', '发展', '统筹兼顾'],
    correctIndex: 2,
    analysis: '科学发展观，第一要义是发展，核心是以人为本，基本要求是全面协调可持续，根本方法是统筹兼顾。',
    difficulty: 'easy'
  },
  {
    id: 'q004',
    chapter: '公共基础知识',
    content: '下列关于公文格式的说法，正确的是：',
    options: ['公文标题可以省略文种', '成文日期应使用阿拉伯数字', '主送机关必须位于标题之上', '印章应盖在成文日期正中偏上'],
    correctIndex: 1,
    analysis: '根据《党政机关公文格式》国家标准，成文日期应使用阿拉伯数字标注，年份用4位数字，月、日分别用1-2位数字。',
    difficulty: 'medium'
  },
  {
    id: 'q005',
    chapter: '公共基础知识',
    content: '我国实行的国家结构形式是：',
    options: ['联邦制', '单一制', '邦联制', '复合制'],
    correctIndex: 1,
    analysis: '我国实行单一制的国家结构形式，即由若干不具有独立性的行政区域单位或自治单位组成，只有一个中央政府、一部宪法。',
    difficulty: 'medium'
  },
  {
    id: 'q006',
    chapter: '行政能力测试',
    content: '某单位有员工120人，其中男员工占60%，女员工中有25%是管理人员，问女员工中有多少人不是管理人员？',
    options: ['36人', '48人', '27人', '18人'],
    correctIndex: 2,
    analysis: '女员工人数 = 120 × (1 - 60%) = 48人，女员工中管理人员 = 48 × 25% = 12人，不是管理人员的女员工 = 48 - 12 = 36人。答案：36人。',
    difficulty: 'easy'
  },
  {
    id: 'q007',
    chapter: '行政能力测试',
    content: '某商品打八折销售后利润率为20%，问原价销售时利润率是多少？',
    options: ['30%', '40%', '50%', '60%'],
    correctIndex: 2,
    analysis: '设成本为100元，打八折后售价为120元（利润率20%），则原价 = 120 ÷ 0.8 = 150元，原价销售利润率 = (150 - 100) ÷ 100 = 50%。',
    difficulty: 'medium'
  },
  {
    id: 'q008',
    chapter: '行政能力测试',
    content: '甲乙两人分别从A、B两地同时出发相向而行，甲每小时走5公里，乙每小时走4公里，3小时后两人相遇，问A、B两地相距多少公里？',
    options: ['27公里', '25公里', '24公里', '21公里'],
    correctIndex: 0,
    analysis: '相遇时两人走过的路程之和即为两地距离：(5 + 4) × 3 = 27公里。',
    difficulty: 'easy'
  },
  {
    id: 'q009',
    chapter: '行政能力测试',
    content: '找出规律：2, 6, 12, 20, 30, ?',
    options: ['38', '40', '42', '44'],
    correctIndex: 2,
    analysis: '规律为：2=1×2，6=2×3，12=3×4，20=4×5，30=5×6，下一项应为6×7=42。',
    difficulty: 'medium'
  },
  {
    id: 'q010',
    chapter: '行政能力测试',
    content: '某单位要从5名候选人中选出2人参加培训，问有多少种不同的选法？',
    options: ['10种', '15种', '20种', '25种'],
    correctIndex: 0,
    analysis: '这是组合问题，C(5,2) = 5! / (2! × (5-2)!) = (5×4) / (2×1) = 10种。',
    difficulty: 'medium'
  },
  {
    id: 'q011',
    chapter: '综合应用能力',
    content: '在公文写作中，请示的主送机关应该是：',
    options: ['多个上级机关', '直接上级机关', '所有相关机关', '社会公众'],
    correctIndex: 1,
    analysis: '请示属于上行文，应当主送一个上级机关，如需同时送其他机关，应当用抄送形式，但不得抄送其下级机关。',
    difficulty: 'easy'
  },
  {
    id: 'q012',
    chapter: '综合应用能力',
    content: '事业单位工作人员年度考核结果分为哪几个档次？',
    options: ['优秀、良好、合格、不合格', '优秀、称职、基本称职、不称职', '优秀、合格、基本合格、不合格', '优秀、良好、一般、较差'],
    correctIndex: 2,
    analysis: '根据《事业单位人事管理条例》，年度考核结果分为优秀、合格、基本合格和不合格四个档次。',
    difficulty: 'medium'
  },
  {
    id: 'q013',
    chapter: '综合应用能力',
    content: '下列关于事业单位岗位设置的说法，正确的是：',
    options: ['管理岗位分为10个等级', '专业技术岗位分为13个等级', '工勤技能岗位分为5个等级', '以上说法都正确'],
    correctIndex: 3,
    analysis: '管理岗位分为10个等级，即一至十级职员岗位；专业技术岗位分为13个等级；工勤技能岗位分为5个等级，即一至五级工勤技能岗位。',
    difficulty: 'hard'
  },
  {
    id: 'q014',
    chapter: '综合应用能力',
    content: '事业单位招聘工作人员应当面向社会公开招聘，以下哪种情况除外？',
    options: ['涉密岗位', '专业性较强岗位', '高层次人才', '紧缺专业人才'],
    correctIndex: 0,
    analysis: '事业单位招聘人员应当面向社会公开招聘，但国家政策性安置、按照人事管理权限由上级任命、涉密岗位等人员除外。',
    difficulty: 'medium'
  },
  {
    id: 'q015',
    chapter: '综合应用能力',
    content: '事业单位工作人员受警告处分的期间为：',
    options: ['3个月', '6个月', '9个月', '12个月'],
    correctIndex: 1,
    analysis: '事业单位工作人员受警告处分的期间为6个月，记过为12个月，降低岗位等级或者撤职为24个月。',
    difficulty: 'easy'
  },
  {
    id: 'q016',
    chapter: '时事政治',
    content: '党的二十大报告指出，中国式现代化是人口规模巨大的现代化，是全体人民共同富裕的现代化，是物质文明和精神文明相协调的现代化，还包括：',
    options: ['人与自然和谐共生的现代化', '走和平发展道路的现代化', '以上都是', '以上都不是'],
    correctIndex: 2,
    analysis: '中国式现代化是人口规模巨大的现代化、全体人民共同富裕的现代化、物质文明和精神文明相协调的现代化、人与自然和谐共生的现代化、走和平发展道路的现代化。',
    difficulty: 'easy'
  },
  {
    id: 'q017',
    chapter: '时事政治',
    content: '我国"十四五"规划的时间范围是：',
    options: ['2020-2024年', '2021-2025年', '2022-2026年', '2023-2027年'],
    correctIndex: 1,
    analysis: '"十四五"规划是指2021年至2025年的国民经济和社会发展规划。',
    difficulty: 'easy'
  },
  {
    id: 'q018',
    chapter: '时事政治',
    content: '我国新发展理念包括创新、协调、绿色、开放和：',
    options: ['和谐', '共享', '文明', '进步'],
    correctIndex: 1,
    analysis: '新发展理念是创新、协调、绿色、开放、共享的发展理念，是习近平新时代中国特色社会主义经济思想的重要内容。',
    difficulty: 'easy'
  },
  {
    id: 'q019',
    chapter: '时事政治',
    content: '兰州是我国哪个省的省会城市？',
    options: ['青海省', '甘肃省', '宁夏回族自治区', '陕西省'],
    correctIndex: 1,
    analysis: '兰州是甘肃省的省会城市，位于中国西北地区，是古丝绸之路的重要节点城市。',
    difficulty: 'easy'
  },
  {
    id: 'q020',
    chapter: '时事政治',
    content: '我国的根本大法是：',
    options: ['民法典', '刑法', '宪法', '行政法'],
    correctIndex: 2,
    analysis: '宪法是我国的根本大法，是治国安邦的总章程，具有最高的法律效力。',
    difficulty: 'easy'
  },
  {
    id: 'q021',
    chapter: '法律法规',
    content: '公民因紧急避险造成他人损害的，应当由谁承担民事责任？',
    options: ['避险人', '引起险情的人', '受害人', '国家'],
    correctIndex: 1,
    analysis: '根据《民法典》规定，因紧急避险造成损害的，由引起险情发生的人承担民事责任。如果险情是由自然原因引起的，紧急避险人不承担民事责任或者给予适当补偿。',
    difficulty: 'medium'
  },
  {
    id: 'q022',
    chapter: '法律法规',
    content: '下列哪项不属于行政处罚的种类？',
    options: ['警告', '罚款', '拘役', '吊销许可证'],
    correctIndex: 2,
    analysis: '拘役属于刑罚中的主刑，不属于行政处罚。行政处罚的种类包括警告、罚款、没收违法所得、没收非法财物、责令停产停业、暂扣或者吊销许可证、暂扣或者吊销执照、行政拘留等。',
    difficulty: 'medium'
  },
  {
    id: 'q023',
    chapter: '法律法规',
    content: '行政复议的申请期限一般为：',
    options: ['30日', '60日', '90日', '120日'],
    correctIndex: 1,
    analysis: '公民、法人或者其他组织认为具体行政行为侵犯其合法权益的，可以自知道该具体行政行为之日起六十日内提出行政复议申请；但是法律规定的申请期限超过六十日的除外。',
    difficulty: 'medium'
  },
  {
    id: 'q024',
    chapter: '法律法规',
    content: '公务员的考核内容包括德、能、勤、绩、廉五个方面，重点考核：',
    options: ['德', '能', '绩', '廉'],
    correctIndex: 2,
    analysis: '公务员的考核内容包括德、能、勤、绩、廉五个方面，重点考核工作实绩。',
    difficulty: 'easy'
  },
  {
    id: 'q025',
    chapter: '法律法规',
    content: '下列关于行政诉讼的说法，正确的是：',
    options: ['行政诉讼可以调解', '行政诉讼中被告承担举证责任', '行政诉讼一律不适用简易程序', '行政诉讼可以口头起诉'],
    correctIndex: 1,
    analysis: '在行政诉讼中，被告对作出的行政行为负有举证责任，应当提供作出该行政行为的证据和所依据的规范性文件。',
    difficulty: 'hard'
  },
  {
    id: 'q026',
    chapter: '公共基础知识',
    content: '我国宪法规定，中华人民共和国的根本制度是：',
    options: ['社会主义制度', '人民代表大会制度', '民主集中制', '中国共产党领导的多党合作制度'],
    correctIndex: 0,
    analysis: '《中华人民共和国宪法》第一条规定："中华人民共和国是工人阶级领导的、以工农联盟为基础的人民民主专政的社会主义国家。社会主义制度是中华人民共和国的根本制度。"',
    difficulty: 'easy'
  },
  {
    id: 'q027',
    chapter: '公共基础知识',
    content: '下列关于我国国家机构的说法，正确的是：',
    options: ['国务院是最高国家权力机关', '全国人大常委会是最高国家行政机关', '人民法院是国家的审判机关', '人民检察院是国家的法律监督机关'],
    correctIndex: 2,
    analysis: '人民法院是国家的审判机关，依法独立行使审判权。国务院是最高国家行政机关，全国人大是最高国家权力机关，人民检察院是法律监督机关。',
    difficulty: 'medium'
  },
  {
    id: 'q028',
    chapter: '行政能力测试',
    content: '一个水池有两个进水管和一个出水管，单开甲管6小时注满，单开乙管4小时注满，单开丙管3小时放空，三管同时打开，几小时注满水池？',
    options: ['6小时', '8小时', '10小时', '12小时'],
    correctIndex: 3,
    analysis: '甲管效率1/6，乙管效率1/4，丙管效率-1/3（放空）。三管同时开效率 = 1/6 + 1/4 - 1/3 = (2+3-4)/12 = 1/12，所以需要12小时注满。',
    difficulty: 'hard'
  },
  {
    id: 'q029',
    chapter: '行政能力测试',
    content: '某公司去年销售额为1000万元，今年销售额比去年增长了20%，问今年销售额是多少？',
    options: ['1100万元', '1200万元', '1300万元', '1400万元'],
    correctIndex: 1,
    analysis: '今年销售额 = 1000 × (1 + 20%) = 1200万元。',
    difficulty: 'easy'
  },
  {
    id: 'q030',
    chapter: '综合应用能力',
    content: '事业单位与工作人员订立的聘用合同，期限一般不低于：',
    options: ['1年', '2年', '3年', '5年'],
    correctIndex: 2,
    analysis: '根据《事业单位人事管理条例》，事业单位与工作人员订立的聘用合同，期限一般不低于3年。',
    difficulty: 'easy'
  },
  {
    id: 'q031',
    chapter: '时事政治',
    content: '兰州市是甘肃省的省会，位于黄河上游，请问兰州的城市标志是：',
    options: ['大雁塔', '中山桥', '黄鹤楼', '滕王阁'],
    correctIndex: 1,
    analysis: '中山桥位于兰州市区中心，横跨黄河，是兰州的标志性建筑，被誉为"天下黄河第一桥"。',
    difficulty: 'easy'
  },
  {
    id: 'q032',
    chapter: '时事政治',
    content: '甘肃省共有多少个地级市？',
    options: ['10个', '12个', '14个', '16个'],
    correctIndex: 0,
    analysis: '甘肃省下辖12个地级市、2个自治州，其中地级市包括兰州、嘉峪关、金昌、白银、天水、酒泉、张掖、武威、定西、陇南。',
    difficulty: 'medium'
  },
  {
    id: 'q033',
    chapter: '时事政治',
    content: '兰州新区是国务院批复的第五个国家级新区，请问它位于兰州市的哪个方向？',
    options: ['东部', '南部', '西部', '北部'],
    correctIndex: 3,
    analysis: '兰州新区位于兰州市北部，地处秦王川盆地，是西北地区第一个国家级新区。',
    difficulty: 'medium'
  },
  {
    id: 'q034',
    chapter: '时事政治',
    content: '甘肃省面积最大的地级市是：',
    options: ['兰州市', '酒泉市', '天水市', '张掖市'],
    correctIndex: 1,
    analysis: '酒泉市总面积约19.2万平方公里，是甘肃省面积最大的地级市，占全省总面积的42%。',
    difficulty: 'medium'
  },
  {
    id: 'q035',
    chapter: '公共基础知识',
    content: '马克思主义哲学认为，物质的唯一特性是：',
    options: ['运动性', '客观实在性', '可知性', '永恒性'],
    correctIndex: 1,
    analysis: '物质的唯一特性是客观实在性，即不依赖于人的意识而存在，并能为人的意识所反映的客观存在。',
    difficulty: 'medium'
  },
  {
    id: 'q036',
    chapter: '公共基础知识',
    content: '辩证法的三大规律不包括：',
    options: ['对立统一规律', '质量互变规律', '否定之否定规律', '因果规律'],
    correctIndex: 3,
    analysis: '辩证法的三大规律是：对立统一规律（核心）、质量互变规律、否定之否定规律。因果规律不属于辩证法三大规律。',
    difficulty: 'medium'
  },
  {
    id: 'q037',
    chapter: '公共基础知识',
    content: '下列选项中，属于唯物主义哲学派别是：',
    options: ['主观唯心主义', '客观唯心主义', '辩证唯物主义', '二元论'],
    correctIndex: 2,
    analysis: '辩证唯物主义是马克思主义哲学的重要组成部分，认为物质是第一性的，意识是第二性的，物质决定意识。',
    difficulty: 'easy'
  },
  {
    id: 'q038',
    chapter: '法律法规',
    content: '根据我国宪法规定，下列哪项不属于公民的基本权利？',
    options: ['选举权和被选举权', '宗教信仰自由', '批评建议权', '制定法律权'],
    correctIndex: 3,
    analysis: '制定法律权是国家权力机关的职权，不属于公民的基本权利。公民的基本权利包括选举权和被选举权、宗教信仰自由、批评建议权等。',
    difficulty: 'medium'
  },
  {
    id: 'q039',
    chapter: '法律法规',
    content: '下列关于刑法的说法，正确的是：',
    options: ['犯罪时不满18周岁的人不适用死刑', '有期徒刑最高期限为20年', '拘役的期限为1个月以上1年以下', '以上都正确'],
    correctIndex: 0,
    analysis: '根据刑法规定，犯罪时不满18周岁的人和审判时怀孕的妇女不适用死刑。有期徒刑最高期限一般为15年，数罪并罚可达25年。拘役期限为1个月以上6个月以下。',
    difficulty: 'hard'
  },
  {
    id: 'q040',
    chapter: '法律法规',
    content: '民法的基本原则不包括：',
    options: ['平等原则', '自愿原则', '诚实信用原则', '过错责任原则'],
    correctIndex: 3,
    analysis: '民法的基本原则包括：平等原则、自愿原则、公平原则、诚实信用原则、公序良俗原则、绿色原则等。过错责任原则是侵权责任的归责原则，不属于民法基本原则。',
    difficulty: 'hard'
  },
  {
    id: 'q041',
    chapter: '行政能力测试',
    content: '某班有50名学生，男生占60%，女生中有80%通过了考试，问女生中未通过考试的有多少人？',
    options: ['4人', '6人', '8人', '10人'],
    correctIndex: 0,
    analysis: '女生人数 = 50 × (1 - 60%) = 20人，未通过考试的女生 = 20 × (1 - 80%) = 4人。',
    difficulty: 'easy'
  },
  {
    id: 'q042',
    chapter: '行政能力测试',
    content: '甲、乙、丙三人合作完成一项工程，甲单独做需要10天，乙单独做需要15天，丙单独做需要20天，三人合作需要多少天？',
    options: ['4天', '5天', '6天', '8天'],
    correctIndex: 0,
    analysis: '甲效率1/10，乙效率1/15，丙效率1/20。合作效率 = 1/10 + 1/15 + 1/20 = (6+4+3)/60 = 13/60，所需时间 = 60/13 ≈ 4.6天，约5天。但精确计算为60/13天，最接近4天。',
    difficulty: 'medium'
  },
  {
    id: 'q043',
    chapter: '行政能力测试',
    content: '找规律填空：1, 3, 7, 15, 31, ?',
    options: ['47', '51', '63', '73'],
    correctIndex: 2,
    analysis: '规律为：后一项 = 前一项 × 2 + 1，即1, 1×2+1=3, 3×2+1=7, 7×2+1=15, 15×2+1=31, 31×2+1=63。',
    difficulty: 'medium'
  },
  {
    id: 'q044',
    chapter: '综合应用能力',
    content: '事业单位工作人员受到记过处分的期间为：',
    options: ['6个月', '12个月', '18个月', '24个月'],
    correctIndex: 1,
    analysis: '根据《事业单位人事管理条例》，记过处分的期间为12个月。',
    difficulty: 'easy'
  },
  {
    id: 'q045',
    chapter: '综合应用能力',
    content: '事业单位年度考核结果为基本合格的工作人员，处理方式是：',
    options: ['解除聘用合同', '降低岗位等级', '不得晋升职务', '扣发全部绩效工资'],
    correctIndex: 2,
    analysis: '年度考核结果为基本合格的，事业单位可以调整其岗位或者安排其离岗培训，不影响正常晋升工资档次，但不得晋升职务。',
    difficulty: 'medium'
  },
  {
    id: 'q046',
    chapter: '公共基础知识',
    content: '毛泽东思想的精髓是：',
    options: ['实事求是', '群众路线', '独立自主', '武装斗争'],
    correctIndex: 0,
    analysis: '实事求是是毛泽东思想的精髓，是中国共产党人认识世界、改造世界的根本要求，是我们党的思想路线。',
    difficulty: 'easy'
  },
  {
    id: 'q047',
    chapter: '公共基础知识',
    content: '邓小平理论的首要基本问题是：',
    options: ['什么是社会主义', '怎样建设社会主义', '什么是社会主义、怎样建设社会主义', '社会主义的本质'],
    correctIndex: 2,
    analysis: '邓小平理论的首要基本问题是"什么是社会主义、怎样建设社会主义"，这是建设中国特色社会主义首要的基本理论问题。',
    difficulty: 'medium'
  },
  {
    id: 'q048',
    chapter: '时事政治',
    content: '我国的"四个全面"战略布局不包括：',
    options: ['全面建设社会主义现代化国家', '全面深化改革', '全面依法治国', '全面建设小康社会'],
    correctIndex: 3,
    analysis: '"四个全面"战略布局是：全面建设社会主义现代化国家、全面深化改革、全面依法治国、全面从严治党。全面建设小康社会是已经完成的目标。',
    difficulty: 'medium'
  },
  {
    id: 'q049',
    chapter: '法律法规',
    content: '下列关于行政许可的说法，正确的是：',
    options: ['行政许可是依职权的行政行为', '行政许可可以口头作出', '行政许可一般不得转让', '行政许可可以设定行政处罚'],
    correctIndex: 2,
    analysis: '行政许可是依申请的行政行为，必须以书面形式作出，一般不得转让。行政许可和行政处罚是两种不同的行政行为。',
    difficulty: 'medium'
  },
  {
    id: 'q050',
    chapter: '时事政治',
    content: '甘肃省政府提出的"强省会"战略，其核心目标是：',
    options: ['将兰州建成西北地区重要中心城市', '提高兰州的GDP总量', '扩大兰州的城市面积', '增加兰州的人口数量'],
    correctIndex: 0,
    analysis: '"强省会"战略的核心目标是将兰州建成西北地区重要中心城市，提升兰州在区域发展中的辐射带动能力。',
    difficulty: 'easy'
  },
]
