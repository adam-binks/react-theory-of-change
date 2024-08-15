import type { Meta, StoryObj } from "@storybook/react"
import { ToC } from "./ToC"

const meta = {
  title: "ToC",
  component: ToC,
  parameters: {},
  tags: ["autodocs"],
} satisfies Meta<typeof ToC>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    data: {
      columns: [
        {
          title: "Approaches needed for change",
          nodes: [
            {
              id: "1",
              title: "Accelerating advocacy",
              text: "Description of accelerating advocacy approach",
              connectionIds: ["2", "3"],
            },
            {
              id: "2",
              title: "Strengthening accountability",
              text: "Details about strengthening accountability",
              connectionIds: ["4", "5"],
            },
            {
              id: "3",
              title: "Scaling research & innovation",
              text: "Information on scaling research and innovation",
              connectionIds: ["6"],
            },
            {
              id: "4",
              title: "Cultivating alliances",
              text: "Explanation of cultivating alliances approach",
              connectionIds: ["7", "8"],
            },
            {
              id: "5",
              title: "Amplifying narratives",
              text: "Description of amplifying narratives strategy",
              connectionIds: ["9"],
            },
            {
              id: "6",
              title: "Redefining value",
              text: "Details about redefining value approach",
              connectionIds: ["10"],
            },
          ],
        },
        {
          title: "How the change is expected to unfold",
          nodes: [
            {
              id: "7",
              title: "Influence policymakers",
              text: "Steps to influence policymakers",
              connectionIds: ["11", "12"],
            },
            {
              id: "8",
              title: "Mechanisms for participation",
              text: "Description of participation mechanisms",
              connectionIds: ["13"],
            },
            {
              id: "9",
              title: "Cross-sectoral movements",
              text: "Information on cross-sectoral movements",
              connectionIds: ["14", "15"],
            },
            {
              id: "10",
              title: "New models lead the change",
              text: "Details about new leading models",
              connectionIds: ["16"],
            },
            {
              id: "11",
              title: "Early majority joins in",
              text: "Description of early majority participation",
              connectionIds: ["17"],
            },
            {
              id: "12",
              title: "Prototypers step up",
              text: "Information about prototypers stepping up",
              connectionIds: ["18"],
            },
            {
              id: "13",
              title: "Measuring what matters",
              text: "Explanation of measuring important factors",
              connectionIds: ["19"],
            },
          ],
        },
        {
          title: "2025 outcomes",
          nodes: [
            {
              id: "14",
              title: "Business and industry",
              text: "Outcomes related to business and industry",
              connectionIds: [],
            },
            {
              id: "15",
              title: "Programmes",
              text: "Expected programme outcomes",
              connectionIds: [],
            },
            {
              id: "16",
              title: "Finance sector",
              text: "Outcomes in the finance sector",
              connectionIds: [],
            },
          ],
        },
      ],
    },
  },
}

export const FourColumnExample = {
  args: {
    data: {
      columns: [
        {
          title: "Column 1",
          nodes: [
            {
              id: "🍎",
              title: "🍎 → 🍋🍇",
              text: "Apple connecting to Lemon and Grape",
              connectionIds: ["🍋", "🍇"],
            },
            {
              id: "🍊",
              title: "🍊 → 🍇",
              text: "Orange connecting to Grape",
              connectionIds: ["🍇"],
            },
          ],
        },
        {
          title: "Column 2",
          nodes: [
            {
              id: "🍋",
              title: "🍋 → 🍉🍓",
              text: "Lemon connecting to Watermelon and Strawberry",
              connectionIds: ["🍉", "🍓"],
            },
            {
              id: "🍇",
              title: "🍇 → 🍓",
              text: "Grape connecting to Strawberry",
              connectionIds: ["🍓"],
            },
            {
              id: "🍐",
              title: "🍐 → 🍉",
              text: "Pear connecting to Watermelon",
              connectionIds: ["🍉"],
            },
          ],
        },
        {
          title: "Column 3",
          nodes: [
            {
              id: "🍉",
              title: "🍉 → 🍍",
              text: "Watermelon connecting to Pineapple",
              connectionIds: ["🍍"],
            },
            {
              id: "🍓",
              title: "🍓 → 🍍🥝",
              text: "Strawberry connecting to Pineapple and Kiwi",
              connectionIds: ["🍍", "🥝"],
            },
          ],
        },
        {
          title: "Column 4",
          nodes: [
            {
              id: "🍍",
              title: "🍍",
              text: "Pineapple",
              connectionIds: [],
            },
            {
              id: "🥝",
              title: "🥝",
              text: "Kiwi",
              connectionIds: [],
            },
            {
              id: "🍑",
              title: "🍑",
              text: "Peach",
              connectionIds: [],
            },
          ],
        },
      ],
    },
  },
}

export const FarmedAnimalTOC: Story = {
  args: {
    data: {
      columns: [
        {
          title: "Approach needed for change",
          nodes: [
            {
              id: "litigation",
              title: "Litigation",
              text: "Courts are willing to rule against powerful agricultural interests, and legal precedents can be established or leveraged to support the prohibition of specific animal farming practices.",
              connectionIds: ["prohibitedFarming", "increasedCost"],
            },
            {
              id: "policyAdvocacy",
              title: "Policy advocacy",
              text: "Policymakers can be convinced that prohibiting certain forms of animal farming is politically viable and socially acceptable, leading to successful legislation.",
              connectionIds: [
                "prohibitedFarming",
                "meatReduction",
                "reducedTalent",
                "industryGrowthHampered",
                "increasedCost",
                "increasedAlternatives",
                "altProteinsOutcompete",
                "legislationProhibitLowWelfare",
              ],
            },
            {
              id: "corporateOutreach",
              title: "Corporate outreach",
              text: "Companies believe that implementing meat reduction policies aligns with their financial interests, customer demand, and public relations goals.",
              connectionIds: [
                "meatReduction",
                "increasedCost",
                "increasedAlternatives",
                "companiesPledgeRemoveLowWelfare",
              ],
            },
            {
              id: "massPublicEducation",
              title: "Mass public education",
              text: "Educational efforts effectively shift public perception, leading fewer individuals to pursue careers in animal farming, either due to ethical considerations or perceived lack of viability.",
              connectionIds: ["reducedTalent", "plantBasedNorm"],
            },
            {
              id: "producerOutreach",
              title: "Producer outreach",
              text: "Producers are convinced that adopting higher welfare practices will not significantly harm their profitability and may even open up new market opportunities or align with emerging regulations.",
              connectionIds: ["producersAdoptHigherWelfare"],
            },
          ],
        },
        {
          title: "Early Changes",
          nodes: [
            {
              id: "prohibitedFarming",
              title: "Forms of animal farming prohibited",
              text: "The prohibition of certain forms of animal farming directly reduces the supply of animal products, and alternative farming methods cannot meet the existing demand.",
              connectionIds: [
                "industryGrowthHampered",
                "decreasedAvailability",
              ],
            },
            {
              id: "meatReduction",
              title: "Meat reduction policies",
              text: "Meat reduction policies effectively reduce consumer demand, leading to a corresponding decrease in the production and availability of animal products.",
              connectionIds: ["decreasedAvailability"],
            },
            {
              id: "reducedTalent",
              title: "Reduced supply of talent",
              text: "A reduced supply of talent in the animal farming industry leads to lower productivity, innovation, or ability to meet production targets, thereby decreasing the availability of animal products.",
              connectionIds: [
                "industryGrowthHampered",
                "decreasedAvailability",
              ],
            },
            {
              id: "industryGrowthHampered",
              title: "Industry growth hampered",
              text: "Industry will not find other avenues for growth",
              connectionIds: ["decreasedAvailability"],
            },
            {
              id: "increasedCost",
              title: "Increased cost of animal products",
              text: "Producers will not cut costs elsewhere. Higher production costs lead to reduced profitability for producers, causing them to decrease output, which in turn reduces the availability of animal products.",
              connectionIds: [
                "industryGrowthHampered",
                "decreasedAvailability",
                "decreasedConsumption",
              ],
            },
            {
              id: "plantBasedNorm",
              title: "Plant-based eating adopted as a social norm",
              text: "As plant-based diets become socially normative, a significant portion of the population shifts away from animal products, resulting in decreased consumption.",
              connectionIds: ["decreasedConsumption"],
            },
            {
              id: "increasedAlternatives",
              title: "Increased availability of alternatives",
              text: "The increased availability of plant-based or alternative protein products meets consumer needs and preferences, leading to a significant reduction in the consumption of traditional animal products.",
              connectionIds: ["plantBasedNorm", "decreasedConsumption"],
            },
            {
              id: "altProteinsOutcompete",
              title: "Alt proteins outcompete animal products",
              text: "Consumers will switch once price, taste, convenience equivalents are available",
              connectionIds: ["decreasedConsumption"],
            },
            {
              id: "legislationProhibitLowWelfare",
              title: "Legislation to prohibit low welfare practices",
              text: "Legislation is effectively enforced, and compliance is widespread, leading to the cessation of low-welfare practices in animal farming.",
              connectionIds: ["lowWelfarePracticesStop"],
            },
            {
              id: "companiesPledgeRemoveLowWelfare",
              title: "Companies pledge to remove low welfare from supply",
              text: "Companies follow through on their pledges and have the means and incentives to implement higher welfare practices across their supply chains. Companies can access enough supply to meet their commitments",
              connectionIds: [
                "producersAdoptHigherWelfare",
                "higherWelfarePracticesImplemented",
              ],
            },
            {
              id: "certifiersAdoptHigherWelfare",
              title: "Certifiers adopt higher welfare in schemes",
              text: "Certification schemes are influential enough that producers are motivated or required to adopt the higher welfare standards in order to maintain certification and market access. Certifiers will enforce higher standards",
              connectionIds: [
                "producersAdoptHigherWelfare",
                "higherWelfarePracticesImplemented",
              ],
            },
            {
              id: "producersAdoptHigherWelfare",
              title: "Producers adopt higher welfare husbandry",
              text: "Producers have the resources and knowledge to implement higher welfare husbandry practices, and there are no significant barriers that prevent them from doing so. Producers will find buyers",
              connectionIds: ["higherWelfarePracticesImplemented"],
            },
          ],
        },
        {
          title: "Late changes",
          nodes: [
            {
              id: "decreasedAvailability",
              title: "Decreased availability of animal products",
              text: "",
              connectionIds: ["reducedNAnimals"],
            },
            {
              id: "decreasedConsumption",
              title: "Decreased consumption of animal products",
              text: "",
              connectionIds: ["reducedNAnimals"],
            },
            {
              id: "lowWelfarePracticesStop",
              title: "Low welfare practices stop",
              text: "",
              connectionIds: ["improvedWelfare"],
            },
            {
              id: "higherWelfarePracticesImplemented",
              title: "Higher welfare practices implemented",
              text: "",
              connectionIds: ["improvedWelfare"],
            },
          ],
        },
        {
          title: "Outcome",
          nodes: [
            {
              id: "reducedNAnimals",
              title: "Reduced N of animals",
              text: "",
              connectionIds: ["reducedSuffering"],
            },
            {
              id: "improvedWelfare",
              title: "Improved welfare of animals",
              text: "",
              connectionIds: ["reducedSuffering"],
            },
          ],
        },
        {
          title: "End goal",
          nodes: [
            {
              id: "reducedSuffering",
              title: "Reduced farmed animal suffering",
              text: "",
              connectionIds: [],
            },
          ],
        },
      ],
    },
  },
}
